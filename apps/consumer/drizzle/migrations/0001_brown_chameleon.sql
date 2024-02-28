ALTER TABLE "sessions" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "email_verified";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "role";