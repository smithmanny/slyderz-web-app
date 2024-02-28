ALTER TABLE "orders" ALTER COLUMN "order_status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "chefs" ALTER COLUMN "onboarding_state" SET DEFAULT 'setup_stripe';