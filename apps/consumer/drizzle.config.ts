import { defineConfig } from 'drizzle-kit'
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./drizzle/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
})