import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';
import * as dotenv from "dotenv";

import * as user from "./schema/user"
import * as menu from "./schema/menu"
import * as order from "./schema/order"

dotenv.config();

const databaseUrl = process.env.DATABASE_URL as string

export const migrateConnection = postgres(databaseUrl, { max: 1 })
export const migrateDB = drizzle(migrateConnection, {
  schema: {
    ...user,
    ...menu,
    ...order,
  }
})

const connection = postgres(databaseUrl)
export const db = drizzle(connection, {
  schema: {
    ...user,
    ...menu,
    ...order,
  }
});