import prisma from "./lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    include: {
      accounts: true,
      sessions: true,
    },
  });

  console.log(`\nFound ${users.length} user(s):\n`);
  users.forEach((user) => {
    console.log(`User: ${user.name} (${user.email})`);
    console.log(`  ID: ${user.id}`);
    console.log(`  Accounts: ${user.accounts.length}`);
    console.log(`  Sessions: ${user.sessions.length}`);
    console.log();
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
