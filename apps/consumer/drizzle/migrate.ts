import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { migratedb, migrationConnection } from './index';

async function main() {
  console.log("Migration started...")
  await migrate(migratedb, { migrationsFolder: './drizzle/migrations' });

  console.log("Migration ended...")
  await migrationConnection.end();
};

main().catch(error => {
  console.error("Migration failed")
  console.log(error)
})