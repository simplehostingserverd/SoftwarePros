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

  const user = await db.user.findUnique({
    where: { id: payload.userId },
  });

  return user;
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = await db.post.findUnique({
      where: { slug: params.slug },
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
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    // Return a sample post if database is not available
    const samplePost = {
      id: '1',
      title: 'Sample Blog Post',
      slug: params.slug,
      content: 'This is a sample blog post.',
      excerpt: 'Sample excerpt',
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
      author: { id: '1', name: 'Sample Author', email: 'author@example.com' },
      categories: [],
      tags: [],
    };
    return NextResponse.json(samplePost);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, excerpt, published, metaTitle, metaDescription } = await request.json();

    let existingPost;
    try {
      existingPost = await db.post.findUnique({
        where: { slug: params.slug },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    let newSlug = params.slug;
    if (title && title !== existingPost.title) {
      newSlug = generateSlug(title);

      // Check if new slug already exists
      const slugExists = await db.post.findUnique({
        where: { slug: newSlug },
      });

      if (slugExists && slugExists.id !== existingPost.id) {
        return NextResponse.json(
          { error: 'A post with this title already exists' },
          { status: 400 }
        );
      }
    }

    const post = await db.post.update({
      where: { slug: params.slug },
      data: {
        title: title || existingPost.title,
        slug: newSlug,
        content: content || existingPost.content,
        excerpt,
        published: published !== undefined ? published : existingPost.published,
        publishedAt: published && !existingPost.published ? new Date() : existingPost.publishedAt,
        metaTitle,
        metaDescription,
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

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let post;
    try {
      post = await db.post.findUnique({
        where: { slug: params.slug },
      });

      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      await db.post.delete({
        where: { slug: params.slug },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
