DROP TABLE "keys";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "amount" TO "total";--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "price" SET DATA TYPE numeric(15, 6);--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "section_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "chef_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "dishes_to_orders" ALTER COLUMN "dish_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "dishes_to_orders" ALTER COLUMN "order_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "hours" ALTER COLUMN "chef_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "sections" ALTER COLUMN "chef_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "chef_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "total" SET DATA TYPE numeric(15, 6);--> statement-breakpoint
ALTER TABLE "chefs" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "subtotal" numeric(15, 6) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "serviceFee" numeric(15, 6) NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "expires_at" timestamp with time zone NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "active_expires";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "idle_expires";--> statement-breakpoint
ALTER TABLE "tokens" DROP COLUMN IF EXISTS "created_at";