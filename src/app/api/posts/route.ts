import { generateSlug, verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { type NextRequest, NextResponse } from 'next/server';

async function getAuthenticatedUser(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: payload.userId },
    });
    return user;
  } catch (error) {
    console.error('Database error in getAuthenticatedUser:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const limit = Number.parseInt(searchParams.get('limit') || '10');
    const offset = Number.parseInt(searchParams.get('offset') || '0');

    const where = published === 'true' ? { published: true } : {};

    let posts: Array<{
      id: string;
      title: string;
      slug: string;
      content: string;
      excerpt: string | null;
      published: boolean;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date | null;
      author: { id: string; name: string | null; email: string };
      categories: Array<{ category: { id: string; name: string } }>;
      tags: Array<{ tag: { id: string; name: string } }>;
    }>;
    let total: number;
    try {
      posts = await db.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          categories: {
            include: {
              category: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      });

      total = await db.post.count({ where });
    } catch (dbError) {
      console.error('Database error fetching posts:', dbError);
      // Return empty result if database is not available
      return NextResponse.json({
        posts: [],
        total: 0,
        hasMore: false,
      });
    }

    return NextResponse.json({
      posts,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, excerpt, published, metaTitle, metaDescription } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const slug = generateSlug(title);

    // Check if slug already exists
    const existingPost = await db.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json({ error: 'A post with this title already exists' }, { status: 400 });
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        published: published || false,
        publishedAt: published ? new Date() : null,
        metaTitle,
        metaDescription,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
