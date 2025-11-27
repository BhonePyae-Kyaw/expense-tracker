import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

// Create a connection pool with proper configuration for serverless
// Use DIRECT_URL for better compatibility with serverless and Prisma Adapter
const pool =
  globalForPrisma.pool ||
  new Pool({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    max: 1, // Limit connection pool size for serverless
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

// Create the Prisma adapter with the pool
const adapter = new PrismaPg(pool);

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
