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