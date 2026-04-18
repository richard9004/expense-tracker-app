import { PrismaClient, Prisma } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const transactionData = [
  { amount: 150.00, type: "expense", description: "Grocery shopping" },
  { amount: 2500.00, type: "income", description: "Monthly salary" },
  { amount: 45.99, type: "expense", description: "Gas station" },
  { amount: 120.00, type: "expense", description: "Electric bill" },
  { amount: 500.00, type: "income", description: "Freelance project" },
];

async function main() {
  await prisma.transaction.deleteMany({});
  console.log("Seeding transactions...");
  for (const t of transactionData) {
    await prisma.transaction.create({ data: t as any });
  }
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
