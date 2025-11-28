/**
 * Script to ensure admin user exists in the database
 * Run this after deployment to create/update admin user in production
 * 
 * Usage: node scripts/ensure-admin.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'traubaid@gmail.com';
  const password = 'trawally@281986';
  
  console.log('🔍 Checking admin user...');
  
  const normalizedEmail = email.toLowerCase().trim();
  const adminPassword = await bcrypt.hash(password, 10);
  
  const admin = await prisma.user.upsert({
    where: { email: normalizedEmail },
    update: {
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true,
    },
    create: {
      email: normalizedEmail,
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Admin user ensured:', admin.email);
  console.log('   Role:', admin.role);
  console.log('   Active:', admin.isActive);
  
  // Verify password
  const isValid = await bcrypt.compare(password, admin.password);
  console.log('   Password verified:', isValid ? '✅' : '❌');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

