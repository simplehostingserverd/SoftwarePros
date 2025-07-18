import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@softwarepros.org' },
    update: {},
    create: {
      email: 'admin@softwarepros.org',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create categories
  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Articles about web development, frameworks, and best practices',
    },
  });

  const healthcareCategory = await prisma.category.upsert({
    where: { slug: 'healthcare' },
    update: {},
    create: {
      name: 'Healthcare',
      slug: 'healthcare',
      description: 'Healthcare software development and HIPAA compliance',
    },
  });

  const enterpriseCategory = await prisma.category.upsert({
    where: { slug: 'enterprise' },
    update: {},
    create: {
      name: 'Enterprise',
      slug: 'enterprise',
      description: 'Enterprise software solutions and architecture',
    },
  });

  console.log('✅ Created categories');

  // Create tags
  const nextjsTag = await prisma.tag.upsert({
    where: { slug: 'nextjs' },
    update: {},
    create: {
      name: 'Next.js',
      slug: 'nextjs',
    },
  });

  const hipaaTag = await prisma.tag.upsert({
    where: { slug: 'hipaa' },
    update: {},
    create: {
      name: 'HIPAA',
      slug: 'hipaa',
    },
  });

  const aiTag = await prisma.tag.upsert({
    where: { slug: 'ai' },
    update: {},
    create: {
      name: 'AI',
      slug: 'ai',
    },
  });

  console.log('✅ Created tags');

  // Create blog posts
  const post1 = await prisma.post.upsert({
    where: { slug: 'building-scalable-web-applications-nextjs' },
    update: {},
    create: {
      title: 'Building Scalable Web Applications with Next.js',
      slug: 'building-scalable-web-applications-nextjs',
      content: `# Building Scalable Web Applications with Next.js

Next.js has revolutionized how we build modern web applications. In this comprehensive guide, we'll explore the key strategies and best practices for creating scalable, high-performance applications that can grow with your business needs.

## Why Choose Next.js for Scalable Applications?

Next.js provides a robust foundation for building scalable web applications with its built-in optimizations, server-side rendering capabilities, and excellent developer experience.

## Architecture Patterns for Scalability

When building scalable applications, architecture is crucial. We recommend following these patterns:

### 1. Component-Based Architecture
Break your application into reusable components that can be easily maintained and tested.

### 2. State Management
Choose the right state management solution based on your application's complexity.

### 3. API Design
Design your APIs with scalability in mind. Use proper HTTP methods, implement pagination, and consider GraphQL for complex data requirements.

## Performance Optimization Strategies

Performance is critical for scalable applications. Here are key optimization techniques:

- Implement proper caching strategies
- Optimize images with Next.js Image component
- Use dynamic imports for code splitting
- Implement proper error boundaries
- Monitor performance with analytics

## Conclusion

Building scalable web applications with Next.js requires careful planning, proper architecture, and attention to performance. By following these best practices and leveraging Next.js's built-in optimizations, you can create applications that perform well at any scale.`,
      excerpt:
        'Learn how to create high-performance, scalable web applications using Next.js and modern development practices.',
      featuredImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      published: true,
      publishedAt: new Date('2024-01-15'),
      metaTitle: 'Building Scalable Web Applications with Next.js - SoftwarePros',
      metaDescription:
        'Learn how to create high-performance, scalable web applications using Next.js and modern development practices.',
      authorId: adminUser.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { slug: 'hipaa-compliance-healthcare-software' },
    update: {},
    create: {
      title: 'HIPAA Compliance in Healthcare Software Development',
      slug: 'hipaa-compliance-healthcare-software',
      content: `# HIPAA Compliance in Healthcare Software Development

HIPAA compliance is not just a legal requirement—it's a fundamental responsibility when developing healthcare software. This comprehensive guide covers everything you need to know about building HIPAA-compliant applications that protect patient data and maintain trust.

## Understanding HIPAA Requirements

The Health Insurance Portability and Accountability Act (HIPAA) establishes national standards for protecting patient health information. For software developers, this means implementing specific technical, administrative, and physical safeguards.

## Technical Safeguards Implementation

Technical safeguards are the technology controls that protect ePHI. Here's how to implement them:

### 1. Access Control
Implement role-based access control (RBAC) to ensure users only access information necessary for their job functions.

### 2. Audit Controls
Maintain comprehensive audit logs that track all access to ePHI.

### 3. Integrity Controls
Protect ePHI from unauthorized alteration or destruction.

### 4. Transmission Security
Encrypt all ePHI in transit using TLS 1.2 or higher.

## Data Encryption Best Practices

Encryption is crucial for HIPAA compliance:

- Use AES-256 encryption for data at rest
- Implement TLS 1.2+ for data in transit
- Use proper key management practices
- Regularly rotate encryption keys
- Encrypt database backups

## Conclusion

HIPAA compliance in healthcare software development requires a comprehensive approach that addresses technical, administrative, and physical safeguards. By following these guidelines and implementing proper security controls, you can build applications that protect patient data and maintain regulatory compliance.`,
      excerpt:
        'Essential guidelines and best practices for developing HIPAA-compliant healthcare applications.',
      featuredImage:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
      published: true,
      publishedAt: new Date('2024-01-10'),
      metaTitle: 'HIPAA Compliance in Healthcare Software Development - SoftwarePros',
      metaDescription:
        'Essential guidelines and best practices for developing HIPAA-compliant healthcare applications.',
      authorId: adminUser.id,
    },
  });

  const post3 = await prisma.post.upsert({
    where: { slug: 'future-enterprise-software-development' },
    update: {},
    create: {
      title: 'The Future of Enterprise Software Development',
      slug: 'future-enterprise-software-development',
      content: `# The Future of Enterprise Software Development

Enterprise software development is undergoing a revolutionary transformation. As we look toward the future, emerging technologies and changing business needs are reshaping how we build, deploy, and maintain enterprise applications.

## AI-Driven Development

Artificial Intelligence is becoming an integral part of the development process, not just the end product. AI-powered tools are transforming how we write, test, and maintain code.

### Code Generation and Assistance
AI coding assistants like GitHub Copilot and ChatGPT are already helping developers write code faster and with fewer errors.

### Intelligent Testing and QA
AI will revolutionize testing by automatically generating test cases, identifying edge cases, and predicting potential failure points.

## Cloud-Native Architecture Evolution

The future of enterprise software is inherently cloud-native, with architectures designed specifically for cloud environments from the ground up.

### Serverless Computing
Serverless architectures will become the default for many enterprise applications, offering automatic scaling and reduced operational overhead.

### Edge Computing Integration
As IoT devices proliferate and latency requirements become more stringent, edge computing will play a crucial role in enterprise applications.

## Enhanced Security and Privacy

As cyber threats evolve and privacy regulations become more stringent, security will be built into every aspect of enterprise software development.

## Conclusion

The future of enterprise software development is exciting and full of possibilities. By embracing these emerging trends and technologies, organizations can build more efficient, secure, and user-friendly applications that drive business success.`,
      excerpt:
        'Exploring emerging trends and technologies shaping the future of enterprise software solutions.',
      featuredImage:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      published: true,
      publishedAt: new Date('2024-01-05'),
      metaTitle: 'The Future of Enterprise Software Development - SoftwarePros',
      metaDescription:
        'Exploring emerging trends and technologies shaping the future of enterprise software solutions.',
      authorId: adminUser.id,
    },
  });

  console.log('✅ Created blog posts');

  // Connect posts to categories and tags
  await prisma.postCategory.createMany({
    data: [
      { postId: post1.id, categoryId: webDevCategory.id },
      { postId: post2.id, categoryId: healthcareCategory.id },
      { postId: post3.id, categoryId: enterpriseCategory.id },
    ],
    skipDuplicates: true,
  });

  await prisma.postTag.createMany({
    data: [
      { postId: post1.id, tagId: nextjsTag.id },
      { postId: post2.id, tagId: hipaaTag.id },
      { postId: post3.id, tagId: aiTag.id },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Connected posts to categories and tags');
  console.log('🎉 Database seeded successfully!');
  console.log('\n📝 Admin Login Credentials:');
  console.log('Email: admin@softwarepros.org');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
