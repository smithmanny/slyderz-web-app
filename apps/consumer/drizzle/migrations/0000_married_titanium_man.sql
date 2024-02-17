DO $$ BEGIN
 CREATE TYPE "days_of_week_type" AS ENUM('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "order_status" AS ENUM('PENDING', 'ACCEPTED', 'COMPLETED', 'DECLINED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "DaysOfWeekType" AS ENUM('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "onboarding_state" AS ENUM('SETUP_STRIPE', 'UPLOAD_HEADSHOT', 'COMPLETE_SERVSAFE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "RoleType" AS ENUM('ADMIN', 'CHEF', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"description" text NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"price" numeric(5, 2) NOT NULL,
	"section_id" text NOT NULL,
	"chef_id" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes_to_orders" (
	"dish_id" text NOT NULL,
	"order_id" text NOT NULL,
	CONSTRAINT "dishes_to_orders_dish_id_order_id_pk" PRIMARY KEY("dish_id","order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hours" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"days_of_week_type" days_of_week_type[],
	"start_time" text,
	"end_time" text,
	"chef_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"chef_id" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"amount" integer NOT NULL,
	"confirmation_number" text NOT NULL,
	"payment_method_id" text NOT NULL,
	"address1" text NOT NULL,
	"address2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipcode" text NOT NULL,
	"event_date" timestamp(3) NOT NULL,
	"event_time" text NOT NULL,
	"order_status" "order_status" DEFAULT 'PENDING' NOT NULL,
	"user_dd" text NOT NULL,
	"chef_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chefs" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"stripeAccountId" text NOT NULL,
	"isOnboardingComplete" boolean DEFAULT false NOT NULL,
	"userId" text NOT NULL,
	"onboarding_state" "onboarding_state" DEFAULT 'SETUP_STRIPE' NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keys" (
	"id" text PRIMARY KEY NOT NULL,
	"hashed_password" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"stripe_customer_id" text DEFAULT '' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"role" "RoleType" DEFAULT 'USER' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"role" "RoleType" DEFAULT 'USER' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"headshot_url" text,
	"location" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "dishes_name_chefId_key" ON "dishes" ("name","chef_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sections_name_key" ON "sections" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sections_name_chefId_key" ON "sections" ("name","chef_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "orders_confirmationNumber_key" ON "orders" ("confirmation_number");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "chefs_userId_key" ON "chefs" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "keys_id_key" ON "keys" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "keys_user_id_idx" ON "keys" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sessions_id_key" ON "sessions" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_stripeCustomerId_key" ON "users" ("stripe_customer_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes" ADD CONSTRAINT "dishes_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes" ADD CONSTRAINT "dishes_chef_id_chefs_id_fk" FOREIGN KEY ("chef_id") REFERENCES "chefs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes_to_orders" ADD CONSTRAINT "dishes_to_orders_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes_to_orders" ADD CONSTRAINT "dishes_to_orders_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hours" ADD CONSTRAINT "hours_chef_id_chefs_id_fk" FOREIGN KEY ("chef_id") REFERENCES "chefs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections" ADD CONSTRAINT "sections_chef_id_chefs_id_fk" FOREIGN KEY ("chef_id") REFERENCES "chefs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_dd_users_id_fk" FOREIGN KEY ("user_dd") REFERENCES "users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_chef_id_chefs_id_fk" FOREIGN KEY ("chef_id") REFERENCES "chefs"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chefs" ADD CONSTRAINT "chefs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "keys" ADD CONSTRAINT "keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
