import "dotenv/config";
import { defineConfig, env } from "prisma/config"; // Import 'env' helper

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Using the 'env' helper is safer in Prisma 7
    url: env("DATABASE_URL"),
  },
});