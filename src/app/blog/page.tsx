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
  title: 'AI & Healthcare Software Development Blog | SoftwarePros',
  description:
    'Expert insights on AI-powered healthcare software, HIPAA compliance, machine learning in medicine, and cutting-edge technology trends. Stay updated with the latest innovations in medical AI and software development.',
  keywords: [
    'AI healthcare software',
    'machine learning medicine',
    'healthcare AI development',
    'HIPAA compliance AI',
    'medical software innovation',
    'healthcare technology trends',
    'AI-powered medical apps',
    'healthcare software development',
    'medical AI integration',
    'healthcare digital transformation',
    'AI medical compliance',
    'healthcare software architecture',
    'medical machine learning',
    'healthcare automation',
    'AI medical diagnostics',
  ],
  alternates: {
    canonical: 'https://softwarepros.org/blog',
  },
  openGraph: {
    title: 'AI & Healthcare Software Development Blog | SoftwarePros',
    description:
      'Expert insights on AI-powered healthcare software, HIPAA compliance, machine learning in medicine, and cutting-edge technology trends.',
    url: 'https://softwarepros.org/blog',
    type: 'website',
    images: [
      { 
        url: '/web-app-manifest-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'SoftwarePros AI Healthcare Technology Blog' 
      },
      {
        url: '/images/placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'SoftwarePros AI Technology Insights Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Healthcare Software Development Blog | SoftwarePros',
    description: 'Expert insights on AI-powered healthcare software, HIPAA compliance, machine learning in medicine, and cutting-edge technology trends.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

// Comprehensive AI & Healthcare blog posts with professional images
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'AI-Powered Medical Diagnostics: Revolutionizing Healthcare with Machine Learning',
    slug: 'ai-powered-medical-diagnostics-revolutionizing-healthcare',
    excerpt:
      'Discover how artificial intelligence is transforming medical diagnostics, from early disease detection to personalized treatment plans. Learn about the latest AI algorithms, real-world applications, and the future of precision medicine.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-12-15'),
    publishedAt: new Date('2024-12-15'),
    author: { name: 'Michael Trevino' },
    categories: [{ category: { id: '1', name: 'AI & Machine Learning' } }],
  },
  {
    id: '2',
    title: 'HIPAA-Compliant AI: Building Secure Healthcare Applications in the Age of Machine Learning',
    slug: 'hipaa-compliant-ai-secure-healthcare-applications',
    excerpt:
      'Navigate the complex intersection of AI technology and healthcare privacy regulations. This comprehensive guide covers data encryption, secure AI model deployment, audit trails, and compliance best practices for healthcare AI applications.',
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    createdAt: new Date('2024-12-10'),
    publishedAt: new Date('2024-12-10'),
    author: { name: 'SoftwarePros Team' },
    categories: [{ category: { id: '2', name: 'Healthcare & Compliance' } }],
  },
  {
    id: '3',
    title: 'The Future of Telemedicine: AI-Enhanced Virtual Care Platforms',
    slug: 'future-telemedicine-ai-enhanced-virtual-care',
    excerpt:
      'Explore the next generation of telemedicine platforms powered by artificial intelligence. From intelligent symptom analysis to automated appointment scheduling, discover how AI is making healthcare more accessible and efficient.',
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    createdAt: new Date('2024-12-05'),
    publishedAt: new Date('2024-12-05'),
    author: { name: 'Michael Trevino' },
    categories: [{ category: { id: '3', name: 'Telemedicine & AI' } }],
  },
  {
    id: '4',
    title: 'Machine Learning in Drug Discovery: Accelerating Pharmaceutical Innovation',
    slug: 'machine-learning-drug-discovery-pharmaceutical-innovation',
    excerpt:
      'Learn how machine learning algorithms are revolutionizing drug discovery and development. Understand the role of AI in molecular modeling, clinical trial optimization, and personalized medicine approaches.',
    featuredImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=400&fit=crop',
    createdAt: new Date('2024-12-01'),
    publishedAt: new Date('2024-12-01'),
    author: { name: 'SoftwarePros Team' },
    categories: [{ category: { id: '4', name: 'Pharmaceutical AI' } }],
  },
  {
    id: '5',
    title: 'AI-Driven Electronic Health Records: Beyond Traditional EMR Systems',
    slug: 'ai-driven-electronic-health-records-beyond-emr',
    excerpt:
      'Discover how artificial intelligence is transforming electronic health records from static databases into intelligent, predictive systems. Learn about natural language processing, automated coding, and clinical decision support.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-11-25'),
    publishedAt: new Date('2024-11-25'),
    author: { name: 'Michael Trevino' },
    categories: [{ category: { id: '5', name: 'EHR & AI' } }],
  },
  {
    id: '6',
    title: 'Predictive Analytics in Healthcare: Forecasting Patient Outcomes with AI',
    slug: 'predictive-analytics-healthcare-forecasting-patient-outcomes',
    excerpt:
      'Explore how predictive analytics and machine learning are helping healthcare providers anticipate patient needs, prevent complications, and improve treatment outcomes. Real-world case studies and implementation strategies.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-11-20'),
    publishedAt: new Date('2024-11-20'),
    author: { name: 'SoftwarePros Team' },
    categories: [{ category: { id: '6', name: 'Predictive Analytics' } }],
  },
  {
    id: '7',
    title: 'Natural Language Processing in Medical Documentation: Automating Clinical Notes',
    slug: 'nlp-medical-documentation-automating-clinical-notes',
    excerpt:
      'Learn how NLP technology is revolutionizing medical documentation by automatically extracting insights from clinical notes, radiology reports, and patient communications. Improve efficiency while maintaining accuracy.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-11-15'),
    publishedAt: new Date('2024-11-15'),
    author: { name: 'Michael Trevino' },
    categories: [{ category: { id: '7', name: 'NLP & Healthcare' } }],
  },
  {
    id: '8',
    title: 'AI-Powered Medical Imaging: Enhancing Radiology with Deep Learning',
    slug: 'ai-powered-medical-imaging-enhancing-radiology',
    excerpt:
      'Discover how deep learning algorithms are transforming medical imaging interpretation. From X-rays to MRIs, learn how AI is improving diagnostic accuracy, reducing interpretation time, and enhancing patient care.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-11-10'),
    publishedAt: new Date('2024-11-10'),
    author: { name: 'SoftwarePros Team' },
    categories: [{ category: { id: '8', name: 'Medical Imaging AI' } }],
  },
  {
    id: '9',
    title: 'Blockchain and AI in Healthcare: Secure, Transparent Medical Data Management',
    slug: 'blockchain-ai-healthcare-secure-medical-data',
    excerpt:
      'Explore the convergence of blockchain technology and artificial intelligence in healthcare. Learn how this powerful combination ensures data integrity, enables secure sharing, and maintains patient privacy.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-11-05'),
    publishedAt: new Date('2024-11-05'),
    author: { name: 'Michael Trevino' },
    categories: [{ category: { id: '9', name: 'Blockchain & AI' } }],
  },
  {
    id: '10',
    title: 'AI Ethics in Healthcare: Balancing Innovation with Patient Safety',
    slug: 'ai-ethics-healthcare-balancing-innovation-safety',
    excerpt:
      'Navigate the ethical considerations of implementing AI in healthcare. Understand bias mitigation, transparency requirements, and the importance of human oversight in AI-driven medical decisions.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-11-01'),
    publishedAt: new Date('2024-11-01'),
    author: { name: 'SoftwarePros Team' },
    categories: [{ category: { id: '10', name: 'AI Ethics' } }],
  },
  {
    id: '11',
    title: 'Edge AI in Healthcare: Bringing Intelligence to Medical Devices',
    slug: 'edge-ai-healthcare-intelligent-medical-devices',
    excerpt:
      'Learn how edge AI is enabling intelligent medical devices that can process data locally, ensuring privacy and real-time responsiveness. Discover applications in wearables, monitoring systems, and diagnostic tools.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-10-25'),
    publishedAt: new Date('2024-10-25'),
    author: { name: 'Michael Trevino' },
    categories: [{ category: { id: '11', name: 'Edge AI & IoT' } }],
  },
  {
    id: '12',
    title: 'The Future of Healthcare Software Development: AI-First Architecture',
    slug: 'future-healthcare-software-development-ai-first-architecture',
    excerpt:
      'Explore the architectural patterns and design principles for building AI-first healthcare applications. Learn about microservices, data pipelines, and scalable AI infrastructure for modern healthcare systems.',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    createdAt: new Date('2024-10-20'),
    publishedAt: new Date('2024-10-20'),
    author: { name: 'SoftwarePros Team' },
    categories: [{ category: { id: '12', name: 'Software Architecture' } }],
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
