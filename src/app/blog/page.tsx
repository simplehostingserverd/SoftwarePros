import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Blog | SoftwarePros.org - Tech Insights & Development Tips',
  description:
    'Stay updated with the latest in software development, tech trends, and industry insights from our expert team at SoftwarePros.',
  alternates: {
    canonical: 'https://softwarepros.org/blog',
  },
  openGraph: {
    title: 'Blog | SoftwarePros.org - Tech Insights & Development Tips',
    description:
      'Stay updated with the latest in software development, tech trends, and industry insights from our expert team.',
    url: 'https://softwarepros.org/blog',
  },
};

async function getPosts() {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 10,
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tech Insights & Development Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest in software development, tech trends, and industry insights
            from our expert team.
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <time dateTime={post.publishedAt?.toISOString()}>
                      {post.publishedAt?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {post.author.name && (
                      <>
                        <span className="mx-2">•</span>
                        <span>By {post.author.name}</span>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}

                  {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((postCategory) => (
                        <span
                          key={postCategory.category.id}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {postCategory.category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No posts yet</h2>
            <p className="text-gray-600">Check back soon for our latest insights and tips!</p>
          </div>
        )}
      </div>
    </div>
  );
}
