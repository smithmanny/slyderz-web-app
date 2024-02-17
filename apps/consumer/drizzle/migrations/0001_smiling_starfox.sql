ALTER TABLE "chefs" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "chefs" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "chefs" RENAME COLUMN "stripeAccountId" TO "stripe_account_id";--> statement-breakpoint
ALTER TABLE "chefs" RENAME COLUMN "isOnboardingComplete" TO "is_onboarding_complete";--> statement-breakpoint
ALTER TABLE "chefs" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "tokens" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "tokens" RENAME COLUMN "expiresAt" TO "expires_at";--> statement-breakpoint
ALTER TABLE "tokens" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "chefs" DROP CONSTRAINT "chefs_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_users_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "chefs_userId_key";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "chefs_userId_key" ON "chefs" ("user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chefs" ADD CONSTRAINT "chefs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
