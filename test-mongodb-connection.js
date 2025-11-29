const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    await prisma.$connect();
    console.log('✅ Prisma connected successfully!');
    
    // Try a simple query
    const count = await prisma.user.count();
    console.log(`✅ Database accessible! User count: ${count}`);
    
    await prisma.$disconnect();
    console.log('✅ Disconnected successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Most likely causes:');
    console.error('1. IP address not whitelisted in MongoDB Atlas');
    console.error('2. MongoDB Atlas cluster is paused');
    console.error('3. Incorrect connection string or credentials');
    console.error('\n📖 See FIX-MONGODB-CONNECTION.md for detailed solutions');
    process.exit(1);
  }
}

test();

