import { db } from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  createdAt: Date;
  publishedAt: Date | null;
  author: {
    name: string | null;
  };
  categories: Array<{
    category: {
      id: string;
      name: string;
    };
  }>;
}

export const metadata: Metadata = {
  title: 'Healthcare Software & Technology Blog | SoftwarePros',
  description:
    'Expert insights on healthcare software development, HIPAA compliance, enterprise solutions, and technology consulting. Stay updated with the latest trends in medical software, digital transformation, and software development best practices.',
  keywords: [
    'healthcare software blog',
    'HIPAA compliance blog',
    'medical software development',
    'healthcare technology insights',
    'enterprise software blog',
    'software development tips',
    'technology consulting blog',
    'medical practice management',
    'EHR EMR systems',
    'healthcare IT consulting',
    'software architecture',
    'digital transformation',
    'healthcare innovation',
    'medical technology trends',
    'software development best practices',
  ],
  alternates: {
    canonical: 'https://softwarepros.org/blog',
  },
  openGraph: {
    title: 'Healthcare Software & Technology Blog | SoftwarePros',
    description:
      'Expert insights on healthcare software development, HIPAA compliance, enterprise solutions, and technology consulting. Stay updated with the latest trends in medical software and digital transformation.',
    url: 'https://softwarepros.org/blog',
    type: 'website',
    images: [
      { 
        url: '/web-app-manifest-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'SoftwarePros Healthcare Technology Blog' 
      },
      {
        url: '/images/placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'SoftwarePros Technology Insights Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Software & Technology Blog | SoftwarePros',
    description: 'Expert insights on healthcare software development, HIPAA compliance, enterprise solutions, and technology consulting.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

// Sample blog posts with free images from Unsplash
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Web Applications with Next.js',
    slug: 'building-scalable-web-applications-nextjs',
    excerpt:
      'Learn how to create high-performance, scalable web applications using Next.js and modern development practices.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    createdAt: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-15'),
    author: { name: 'Michael Trevino' },
    categories: [{ category: { id: '1', name: 'Web Development' } }],
  },
  {
    id: '2',
    title: 'HIPAA Compliance in Healthcare Software Development',
    slug: 'hipaa-compliance-healthcare-software',
    excerpt:
      'Essential guidelines and best practices for developing HIPAA-compliant healthcare applications.',
    featuredImage:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    createdAt: new Date('2024-01-10'),
    publishedAt: new Date('2024-01-10'),
    author: { name: 'SoftwarePros Team' },
    categories: [{ category: { id: '2', name: 'Healthcare' } }],
  },
  {
    id: '3',
    title: 'The Future of Enterprise Software Development',
    slug: 'future-enterprise-software-development',
    excerpt:
      'Exploring emerging trends and technologies shaping the future of enterprise software solutions.',
    featuredImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    createdAt: new Date('2024-01-05'),
    publishedAt: new Date('2024-01-05'),
    author: { name: 'Michael Trevino' },
    categories: [{ category: { id: '3', name: 'Enterprise' } }],
  },
];

async function getPosts() {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.log('No DATABASE_URL found, using sample posts');
      return samplePosts;
    }
    
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
    
    // If no posts found in database, return sample posts
    if (posts.length === 0) {
      console.log('No posts found in database, using sample posts');
      return samplePosts;
    }
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return sample posts if database is not available
    return samplePosts;
  }
}

export default async function BlogPage() {
  try {
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
              {posts.map((post: BlogPost) => (
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
                        aria-hidden="true"
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
  } catch (error) {
    console.error('Error rendering blog page:', error);
    // Fallback UI if something goes wrong
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tech Insights & Development Tips
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest in software development, tech trends, and industry insights
              from our expert team.
            </p>
          </div>
          
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
            <p className="text-gray-600">Please wait while we load our latest insights and tips!</p>
          </div>
        </div>
      </div>
    );
  }
}
