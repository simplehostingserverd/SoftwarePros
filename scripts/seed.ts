import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await hashPassword('admin123');
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@softwarepros.org' },
    update: {},
    create: {
      email: 'admin@softwarepros.org',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', admin.email);

  // Create sample categories
  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Articles about web development technologies and best practices',
    },
  });

  const techTrendsCategory = await prisma.category.upsert({
    where: { slug: 'tech-trends' },
    update: {},
    create: {
      name: 'Tech Trends',
      slug: 'tech-trends',
      description: 'Latest trends and innovations in technology',
    },
  });

  console.log('Created categories');

  // Create sample tags
  const reactTag = await prisma.tag.upsert({
    where: { slug: 'react' },
    update: {},
    create: {
      name: 'React',
      slug: 'react',
    },
  });

  const nextjsTag = await prisma.tag.upsert({
    where: { slug: 'nextjs' },
    update: {},
    create: {
      name: 'Next.js',
      slug: 'nextjs',
    },
  });

  const typescriptTag = await prisma.tag.upsert({
    where: { slug: 'typescript' },
    update: {},
    create: {
      name: 'TypeScript',
      slug: 'typescript',
    },
  });

  console.log('Created tags');

  // Create sample blog post
  const samplePost = await prisma.post.upsert({
    where: { slug: 'welcome-to-softwarepros-blog' },
    update: {},
    create: {
      title: 'Welcome to the SoftwarePros Blog',
      slug: 'welcome-to-softwarepros-blog',
      content: `# Welcome to Our Blog!

We're excited to launch the SoftwarePros blog, where we'll share insights, tips, and best practices from our years of experience in software development.

## What You Can Expect

Our blog will cover a wide range of topics including:

- **Web Development**: Modern frameworks, best practices, and emerging technologies
- **Mobile Development**: Native and cross-platform solutions
- **Enterprise Solutions**: Scalable architectures and system design
- **Tech Trends**: Industry insights and future predictions
- **Development Tips**: Practical advice for developers at all levels

## Our Mission

At SoftwarePros, we believe in sharing knowledge and helping the developer community grow. Through this blog, we aim to:

1. Share practical solutions to common development challenges
2. Discuss emerging technologies and their real-world applications
3. Provide insights from our experience working with startups and enterprises
4. Foster a community of learning and collaboration

## Stay Connected

We'll be publishing new content regularly, so make sure to check back often. You can also follow us on social media for updates and additional content.

Thank you for joining us on this journey!`,
      excerpt: 'Welcome to the SoftwarePros blog! Learn about our mission to share knowledge and help the developer community grow.',
      published: true,
      publishedAt: new Date(),
      metaTitle: 'Welcome to SoftwarePros Blog - Tech Insights & Development Tips',
      metaDescription: 'Welcome to the SoftwarePros blog where we share software development insights, best practices, and industry trends.',
      authorId: admin.id,
    },
  });

  // Connect post to categories and tags
  await prisma.postCategory.upsert({
    where: {
      postId_categoryId: {
        postId: samplePost.id,
        categoryId: webDevCategory.id,
      },
    },
    update: {},
    create: {
      postId: samplePost.id,
      categoryId: webDevCategory.id,
    },
  });

  await prisma.postTag.upsert({
    where: {
      postId_tagId: {
        postId: samplePost.id,
        tagId: reactTag.id,
      },
    },
    update: {},
    create: {
      postId: samplePost.id,
      tagId: reactTag.id,
    },
  });

  console.log('Created sample blog post');
  console.log('Seeding completed!');
  console.log('\nAdmin credentials:');
  console.log('Email: admin@softwarepros.org');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
