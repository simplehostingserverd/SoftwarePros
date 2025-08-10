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

  // Create secure admin user
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

  console.log('🎉 Database seeded successfully!');
  console.log('\n📝 Admin Login Credentials:');
  console.log('Email: admin@softwarepros.org');
  console.log('Password: admin123');
  console.log('\n📝 Secure Admin Login Credentials:');
  console.log('Email: admin.medical@softwarepros.org');
  console.log('Password: MedicalDev2024!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });