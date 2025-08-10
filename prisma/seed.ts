import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { additionalPosts } from './additional-posts';

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

  // Create NEW admin user with secure credentials
  const newAdminPassword = await bcrypt.hash('MedicalDev2024!', 12);

  const newAdminUser = await prisma.user.upsert({
    where: { email: 'admin.medical@softwarepros.org' },
    update: {},
    create: {
      email: 'admin.medical@softwarepros.org',
      name: 'Medical Software Admin',
      password: newAdminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created new medical software admin user:', newAdminUser.email);

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

  const medicalInfraCategory = await prisma.category.upsert({
    where: { slug: 'medical-software-infrastructure' },
    update: {},
    create: {
      name: 'Medical Software Infrastructure',
      slug: 'medical-software-infrastructure',
      description: 'Infrastructure patterns and compliance for medical/healthcare systems',
    },
  });

  const aiDevCategory = await prisma.category.upsert({
    where: { slug: 'ai-development' },
    update: {},
    create: {
      name: 'AI Development',
      slug: 'ai-development',
      description: 'AI/ML product engineering, MLOps, and applied AI in healthcare',
    },
  });

  const securityCategory = await prisma.category.upsert({
    where: { slug: 'security' },
    update: {},
    create: {
      name: 'Security',
      slug: 'security',
      description: 'Cybersecurity, data protection, and security best practices',
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

  const infrastructureTag = await prisma.tag.upsert({
    where: { slug: 'infrastructure' },
    update: {},
    create: {
      name: 'Infrastructure',
      slug: 'infrastructure',
    },
  });

  const codingStandardsTag = await prisma.tag.upsert({
    where: { slug: 'coding-standards' },
    update: {},
    create: {
      name: 'Coding Standards',
      slug: 'coding-standards',
    },
  });

  const fhirTag = await prisma.tag.upsert({
    where: { slug: 'hl7-fhir' },
    update: {},
    create: {
      name: 'HL7 FHIR',
      slug: 'hl7-fhir',
    },
  });

  const devopsTag = await prisma.tag.upsert({
    where: { slug: 'devops' },
    update: {},
    create: {
      name: 'DevOps',
      slug: 'devops',
    },
  });

  const mlTag = await prisma.tag.upsert({
    where: { slug: 'machine-learning' },
    update: {},
    create: {
      name: 'Machine Learning',
      slug: 'machine-learning',
    },
  });

  const blockchainTag = await prisma.tag.upsert({
    where: { slug: 'blockchain' },
    update: {},
    create: {
      name: 'Blockchain',
      slug: 'blockchain',
    },
  });

  const iomtTag = await prisma.tag.upsert({
    where: { slug: 'iomt' },
    update: {},
    create: {
      name: 'IoMT',
      slug: 'iomt',
    },
  });

  const telemedicineTag = await prisma.tag.upsert({
    where: { slug: 'telemedicine' },
    update: {},
    create: {
      name: 'Telemedicine',
      slug: 'telemedicine',
    },
  });

  const rpaTag = await prisma.tag.upsert({
    where: { slug: 'rpa' },
    update: {},
    create: {
      name: 'RPA',
      slug: 'rpa',
    },
  });

  const cybersecurityTag = await prisma.tag.upsert({
    where: { slug: 'cybersecurity' },
    update: {},
    create: {
      name: 'Cybersecurity',
      slug: 'cybersecurity',
    },
  });

  const digitalTherapeuticsTag = await prisma.tag.upsert({
    where: { slug: 'digital-therapeutics' },
    update: {},
    create: {
      name: 'Digital Therapeutics',
      slug: 'digital-therapeutics',
    },
  });

  const federatedLearningTag = await prisma.tag.upsert({
    where: { slug: 'federated-learning' },
    update: {},
    create: {
      name: 'Federated Learning',
      slug: 'federated-learning',
    },
  });

  const quantumComputingTag = await prisma.tag.upsert({
    where: { slug: 'quantum-computing' },
    update: {},
    create: {
      name: 'Quantum Computing',
      slug: 'quantum-computing',
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

  const post4 = await prisma.post.upsert({
    where: { slug: 'designing-medical-software-infrastructure' },
    update: {},
    create: {
      title: 'Designing Medical Software Infrastructure that Scales and Stays Compliant',
      slug: 'designing-medical-software-infrastructure',
      content: `# Designing Medical Software Infrastructure that Scales and Stays Compliant

Building healthcare platforms requires balancing performance, safety, and regulatory compliance. This guide covers reference architectures and controls to keep your systems resilient and compliant.

## Reference Architecture

- API Gateway + Microservices for modularity
- Event streaming for audit and interoperability
- Isolated PHI data plane and strict IAM

## Compliance by Design

- Encryption at rest/in transit, HSM-backed keys
- Immutable audit logs (WORM storage)
- BAA with vendors; SOC2, HITRUST alignment

## Reliability & Observability

- SLOs, health checks, auto-scaling
- Tracing (OpenTelemetry), structured logs, metrics

## Data Interoperability

- HL7 v2 interfaces, FHIR R4 APIs, SMART on FHIR

## Takeaway

Start with a secure-by-default baseline, then evolve to microservices/MLOps when justified by scale.`,
      excerpt:
        'Reference architecture and compliance controls for scalable, secure medical software infrastructure.',
      featuredImage:
        'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1200&h=630&fit=crop',
      published: true,
      publishedAt: new Date('2024-02-01'),
      metaTitle: 'Designing Medical Software Infrastructure that Scales and Stays Compliant',
      metaDescription:
        'Reference architecture, compliance-by-design, and interoperability for medical software.',
      authorId: adminUser.id,
    },
  });

  const post5 = await prisma.post.upsert({
    where: { slug: 'coding-standards-for-medical-software' },
    update: {},
    create: {
      title: 'Coding Standards for Medical Software: Safety, Quality, and Velocity',
      slug: 'coding-standards-for-medical-software',
      content: `# Coding Standards for Medical Software: Safety, Quality, and Velocity

Consistent engineering practices reduce defects and accelerate delivery in regulated environments.

## Essentials

- Typed languages or strict typing (TS)
- Defensive programming and clear error handling
- Layered architecture with dependency boundaries

## Testing Strategy

- Unit, contract, and e2e tests; mutation testing for critical paths
- Test data management without PHI

## Secure Coding

- Threat modeling, input validation, output encoding
- Secrets management, least privilege

## Documentation

- ADRs, architecture diagrams, and change logs

## Takeaway

Adopt standards that are easy to follow and automated in CI to improve outcomes.`,
      excerpt: 'Engineering practices that improve safety and speed for healthcare software teams.',
      featuredImage:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=630&fit=crop',
      published: true,
      publishedAt: new Date('2024-02-08'),
      metaTitle: 'Coding Standards for Medical Software',
      metaDescription:
        'Testing strategies, secure coding, and documentation patterns for healthcare software.',
      authorId: adminUser.id,
    },
  });

  const post6 = await prisma.post.upsert({
    where: { slug: 'hl7-fhir-interoperability-guide' },
    update: {},
    create: {
      title: 'HL7 FHIR Interoperability Guide: Practical Integration Patterns',
      slug: 'hl7-fhir-interoperability-guide',
      content: `# HL7 FHIR Interoperability Guide: Practical Integration Patterns

FHIR unlocks modern healthcare integrations. This guide shows common patterns and pitfalls.

## Patterns

- Backend for FHIR: normalize resource access
- Event-driven sync from EHRs (Subscriptions)
- Bulk Data (Flat FHIR) for analytics

## Security

- SMART on FHIR OAuth 2.0
- Scopes, consent, and audit trails

## Testing

- Use public test servers and synthetic data

## Takeaway

Design APIs for resilience and map to FHIR resources at the boundaries.`,
      excerpt: 'Real-world FHIR integration patterns, security, and testing strategies.',
      featuredImage:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=630&fit=crop',
      published: true,
      publishedAt: new Date('2024-02-15'),
      metaTitle: 'HL7 FHIR Interoperability: Practical Patterns',
      metaDescription: 'Integration, security, and testing strategies for HL7 FHIR in healthcare.',
      authorId: adminUser.id,
    },
  });

  const post7 = await prisma.post.upsert({
    where: { slug: 'ai-in-healthcare-risk-benefit-framework' },
    update: {},
    create: {
      title: 'AI in Healthcare: A Practical Risk–Benefit Framework',
      slug: 'ai-in-healthcare-risk-benefit-framework',
      content: `# AI in Healthcare: A Practical Risk–Benefit Framework

Apply AI where it meaningfully improves outcomes while managing clinical and regulatory risks.

## Use Cases

- Triage, scheduling, and CDI
- Voice-to-text and ambient scribe
- Predictive risk scoring with clinician oversight

## Safety & Governance

- Bias assessment, data provenance, model monitoring
- Human-in-the-loop and auditability

## MLOps for Regulated Settings

- Dataset versioning, lineage, reproducibility
- Approval gates and post-deployment monitoring

## Takeaway

Start with low-risk, high-ROI use cases; plan for human oversight and robust monitoring.`,
      excerpt: 'Where AI fits in healthcare today and how to manage safety, governance, and ROI.',
      featuredImage:
        'https://images.unsplash.com/photo-1559757175-08c4e7d01a53?w=1200&h=630&fit=crop',
      published: true,
      publishedAt: new Date('2024-02-22'),
      metaTitle: 'AI in Healthcare: Risk–Benefit Framework',
      metaDescription: 'Use cases, governance, and MLOps guidance for deploying AI in healthcare.',
      authorId: adminUser.id,
    },
  });

  const post8 = await prisma.post.upsert({
    where: { slug: 'mlops-for-medical-software' },
    update: {},
    create: {
      title: 'MLOps for Medical Software: From Experiment to Production',
      slug: 'mlops-for-medical-software',
      content: `# MLOps for Medical Software: From Experiment to Production

Ship models safely with clear pipelines, governance, and monitoring.

## Pipeline

- Data ingestion → labeling → training → evaluation → packaging
- CI/CD with approval gates; model registry

## Monitoring

- Data drift, performance, fairness
- Alerting and rollback strategies

## Compliance

- Document datasets, model cards, and clinical validation

## Takeaway

Treat models like software artifacts with versioning, tests, and staged rollouts.`,
      excerpt: 'A practical blueprint for productionizing AI safely in healthcare settings.',
      featuredImage:
        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=630&fit=crop',
      published: true,
      publishedAt: new Date('2024-03-01'),
      metaTitle: 'MLOps for Medical Software',
      metaDescription: 'Pipelines, monitoring, and compliance for production AI in healthcare.',
      authorId: adminUser.id,
    },
  });

  const post9 = await prisma.post.upsert({
    where: { slug: 'devops-for-healthcare-platforms' },
    update: {},
    create: {
      title: 'DevOps for Healthcare Platforms: Secure, Fast, Reliable',
      slug: 'devops-for-healthcare-platforms',
      content: `# DevOps for Healthcare Platforms: Secure, Fast, Reliable

DevOps in healthcare must optimize delivery while maintaining strict security.

## Core Practices

- GitOps, IaC, and ephemeral environments
- Policy-as-code and automated compliance checks

## Reliability

- Blue/green, canary, and feature flags
- Game days and incident response runbooks

## Security

- SBOM, SAST/DAST, supply chain security

## Takeaway

Embed compliance and security in the pipeline without slowing teams down.`,
      excerpt: 'DevOps patterns that work in regulated healthcare environments.',
      featuredImage:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop',
      published: true,
      publishedAt: new Date('2024-03-08'),
      metaTitle: 'DevOps for Healthcare Platforms',
      metaDescription: 'CI/CD, reliability, and security for healthcare-grade platforms.',
      authorId: adminUser.id,
    },
  });

  // Create additional blog posts
  const additionalPostPromises = additionalPosts.map(async (postData) => {
    return await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: {
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt,
        featuredImage: postData.featuredImage,
        published: true,
        publishedAt: postData.publishedAt,
        metaTitle: postData.metaTitle,
        metaDescription: postData.metaDescription,
        authorId: adminUser.id,
      },
    });
  });

  const additionalPostsCreated = await Promise.all(additionalPostPromises);
  console.log(`✅ Created ${additionalPostsCreated.length} additional blog posts`);

  console.log('✅ Created blog posts');

  // Connect posts to categories and tags
  await prisma.postCategory.createMany({
    data: [
      { postId: post1.id, categoryId: webDevCategory.id },
      { postId: post2.id, categoryId: healthcareCategory.id },
      { postId: post3.id, categoryId: enterpriseCategory.id },
      { postId: post4.id, categoryId: medicalInfraCategory.id },
      { postId: post5.id, categoryId: healthcareCategory.id },
      { postId: post6.id, categoryId: healthcareCategory.id },
      { postId: post6.id, categoryId: medicalInfraCategory.id },
      { postId: post7.id, categoryId: aiDevCategory.id },
      { postId: post7.id, categoryId: healthcareCategory.id },
      { postId: post8.id, categoryId: aiDevCategory.id },
      { postId: post8.id, categoryId: healthcareCategory.id },
      { postId: post9.id, categoryId: enterpriseCategory.id },
      { postId: post9.id, categoryId: healthcareCategory.id },
    ],
    skipDuplicates: true,
  });

  await prisma.postTag.createMany({
    data: [
      { postId: post1.id, tagId: nextjsTag.id },
      { postId: post2.id, tagId: hipaaTag.id },
      { postId: post3.id, tagId: aiTag.id },
      { postId: post4.id, tagId: infrastructureTag.id },
      { postId: post4.id, tagId: hipaaTag.id },
      { postId: post5.id, tagId: codingStandardsTag.id },
      { postId: post5.id, tagId: hipaaTag.id },
      { postId: post6.id, tagId: fhirTag.id },
      { postId: post6.id, tagId: infrastructureTag.id },
      { postId: post7.id, tagId: aiTag.id },
      { postId: post7.id, tagId: mlTag.id },
      { postId: post8.id, tagId: mlTag.id },
      { postId: post8.id, tagId: aiTag.id },
      { postId: post9.id, tagId: devopsTag.id },
      { postId: post9.id, tagId: infrastructureTag.id },
    ],
    skipDuplicates: true,
  });

  // Connect additional posts to categories and tags
  const additionalPostCategories: Array<{ postId: string; categoryId: string }> = [];
  const additionalPostTags: Array<{ postId: string; tagId: string }> = [];

  for (let index = 0; index < additionalPosts.length; index++) {
    const postData = additionalPosts[index];
    const postId = additionalPostsCreated[index].id;

    // Connect to categories
    for (const categoryName of postData.categories) {
      let categoryId: string;
      switch (categoryName) {
        case 'AI Development':
          categoryId = aiDevCategory.id;
          break;
        case 'Healthcare':
          categoryId = healthcareCategory.id;
          break;
        case 'Enterprise':
          categoryId = enterpriseCategory.id;
          break;
        case 'Security':
          categoryId = securityCategory.id;
          break;
        default:
          categoryId = healthcareCategory.id;
      }
      additionalPostCategories.push({ postId, categoryId });
    }

    // Connect to tags
    for (const tagName of postData.tags) {
      let tagId: string;
      switch (tagName) {
        case 'AI':
          tagId = aiTag.id;
          break;
        case 'Machine Learning':
          tagId = mlTag.id;
          break;
        case 'Blockchain':
          tagId = blockchainTag.id;
          break;
        case 'IoMT':
          tagId = iomtTag.id;
          break;
        case 'Telemedicine':
          tagId = telemedicineTag.id;
          break;
        case 'RPA':
          tagId = rpaTag.id;
          break;
        case 'Cybersecurity':
          tagId = cybersecurityTag.id;
          break;
        case 'Digital Therapeutics':
          tagId = digitalTherapeuticsTag.id;
          break;
        case 'Federated Learning':
          tagId = federatedLearningTag.id;
          break;
        case 'Quantum Computing':
          tagId = quantumComputingTag.id;
          break;
        default:
          tagId = aiTag.id;
      }
      additionalPostTags.push({ postId, tagId });
    }
  }

  await prisma.postCategory.createMany({
    data: additionalPostCategories,
    skipDuplicates: true,
  });

  await prisma.postTag.createMany({
    data: additionalPostTags,
    skipDuplicates: true,
  });

  console.log('✅ Connected additional posts to categories and tags');
  console.log('✅ Connected posts to categories and tags');
  console.log('🎉 Database seeded successfully!');
  console.log('\n📝 Admin Login Credentials:');
  console.log('Email: admin@softwarepros.org');
  console.log('Password: admin123');
  console.log('\n🆕 NEW Medical Software Admin Credentials:');
  console.log('Email: admin.medical@softwarepros.org');
  console.log('Password: MedicalDev2024!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
