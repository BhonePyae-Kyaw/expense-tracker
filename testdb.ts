import prisma from "./lib/prisma";
import { Category } from "./app/generated/prisma/client";

async function main() {
  const categories: Category[] = await prisma.category.findMany();
  console.log("Categories:", categories);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
