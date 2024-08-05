import { PrismaClient } from '@prisma/client';

console.log("Trying connection...");

const globalForPrisma = globalThis;

globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();

const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Function to test the connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Connection established!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the connection test
testConnection();
