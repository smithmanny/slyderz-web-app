ALTER TABLE "users" RENAME COLUMN "stripeCustomer_id" TO "stripe_customer_id";--> statement-breakpoint
DROP INDEX IF EXISTS "users_stripeCustomerId_key";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_stripeCustomerId_key" ON "users" ("stripe_customer_id");