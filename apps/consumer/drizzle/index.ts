import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from "dotenv";
dotenv.config();

import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL as string
export const migrationConnection = postgres(databaseUrl, { max: 1 });
export const migratedb = drizzle(migrationConnection);

const queryConnection = postgres(databaseUrl);
export const db = drizzle(queryConnection, { schema });