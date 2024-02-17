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
 CREATE TYPE "onboarding_state" AS ENUM('SETUP_STRIPE', 'UPLOAD_HEADSHOT', 'COMPLETE_SERVSAFE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes_to_orders" (
	"dish_id" text NOT NULL,
	"order_id" text NOT NULL,
	CONSTRAINT "dishes_to_orders_dish_id_order_id_pk" PRIMARY KEY("dish_id","order_id")
);
--> statement-breakpoint
DROP TABLE "orderItems";--> statement-breakpoint
ALTER TABLE "dishes" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "dishes" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "dishes" RENAME COLUMN "imageUrl" TO "image_url";--> statement-breakpoint
ALTER TABLE "dishes" RENAME COLUMN "sectionId" TO "section_id";--> statement-breakpoint
ALTER TABLE "dishes" RENAME COLUMN "chefId" TO "chef_id";--> statement-breakpoint
ALTER TABLE "dishes" RENAME COLUMN "isActive" TO "is_active";--> statement-breakpoint
ALTER TABLE "hours" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "hours" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "hours" RENAME COLUMN "daysOfWeekType" TO "days_of_week_type";--> statement-breakpoint
ALTER TABLE "hours" RENAME COLUMN "startTime" TO "start_time";--> statement-breakpoint
ALTER TABLE "hours" RENAME COLUMN "endTime" TO "end_time";--> statement-breakpoint
ALTER TABLE "hours" RENAME COLUMN "chefId" TO "chef_id";--> statement-breakpoint
ALTER TABLE "sections" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "sections" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "sections" RENAME COLUMN "chefId" TO "chef_id";--> statement-breakpoint
ALTER TABLE "sections" RENAME COLUMN "isActive" TO "is_active";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "confirmationNumber" TO "confirmation_number";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "paymentMethodId" TO "payment_method_id";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "eventDate" TO "event_date";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "eventTime" TO "event_time";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "orderStatus" TO "order_status";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "userId" TO "user_dd";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "chefId" TO "chef_id";--> statement-breakpoint
ALTER TABLE "chefs" RENAME COLUMN "onboardingState" TO "onboarding_state";--> statement-breakpoint
ALTER TABLE "sessions" RENAME COLUMN "stripeCustomerId" TO "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "sessions" RENAME COLUMN "emailVerified" TO "email_verified";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "stripeCustomerId" TO "stripeCustomer_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "emailVerified" TO "email_verified";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "headshotUrl" TO "headshot_url";--> statement-breakpoint
ALTER TABLE "dishes" DROP CONSTRAINT "dishes_sectionId_sections_id_fk";
--> statement-breakpoint
ALTER TABLE "dishes" DROP CONSTRAINT "dishes_chefId_chefs_id_fk";
--> statement-breakpoint
ALTER TABLE "hours" DROP CONSTRAINT "hours_chefId_chefs_id_fk";
--> statement-breakpoint
ALTER TABLE "sections" DROP CONSTRAINT "sections_chefId_chefs_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_chefId_chefs_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "dishes_name_chefId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "sections_name_chefId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "orders_confirmationNumber_key";--> statement-breakpoint
DROP INDEX IF EXISTS "users_stripeCustomerId_key";--> statement-breakpoint
ALTER TABLE "hours" ALTER COLUMN "days_of_week_type" SET DATA TYPE days_of_week_type[];--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_status" SET DATA TYPE order_status;--> statement-breakpoint
ALTER TABLE "chefs" ALTER COLUMN "onboarding_state" SET DATA TYPE onboarding_state;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "dishes_name_chefId_key" ON "dishes" ("name","chef_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sections_name_chefId_key" ON "sections" ("name","chef_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "orders_confirmationNumber_key" ON "orders" ("confirmation_number");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_stripeCustomerId_key" ON "users" ("stripeCustomer_id");--> statement-breakpoint
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
