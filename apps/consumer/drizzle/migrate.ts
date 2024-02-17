import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { migrateDB, migrateConnection } from './index';

async function main() {
  console.log("Migration started...")
  await migrate(migrateDB, { migrationsFolder: 'drizzle/migrations' });
};

main().catch(error => {
  console.error("Migration failed")
  console.log(error)
}).finally(async () => {
  console.log("Migration ended...")
  await migrateConnection.end()
})