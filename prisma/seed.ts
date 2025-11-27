import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  { name: "Food & Dining", icon: "🍔", color: "#FF6B6B" },
  { name: "Transportation", icon: "🚗", color: "#4ECDC4" },
  { name: "Shopping", icon: "🛍️", color: "#45B7D1" },
  { name: "Entertainment", icon: "🎬", color: "#FFA07A" },
  { name: "Bills & Utilities", icon: "💡", color: "#98D8C8" },
  { name: "Healthcare", icon: "🏥", color: "#F7B801" },
  { name: "Education", icon: "📚", color: "#6C5CE7" },
  { name: "Groceries", icon: "🛒", color: "#74B816" },
  { name: "Travel", icon: "✈️", color: "#FF6B9D" },
  { name: "Housing", icon: "🏠", color: "#95A5A6" },
  { name: "Personal Care", icon: "🧼", color: "#E17055" },
  { name: "Other", icon: "📦", color: "#A8A8A8" },
];

export async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
}

main();
