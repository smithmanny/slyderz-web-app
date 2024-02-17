-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "RoleType" AS ENUM('ADMIN', 'CHEF', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "DaysOfWeekTypeEnum" AS ENUM('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "OrderStatus" AS ENUM('PENDING', 'ACCEPTED', 'COMPLETED', 'DECLINED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "OnboardingState" AS ENUM('SETUP_STRIPE', 'UPLOAD_HEADSHOT', 'COMPLETE_SERVSAFE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DishPhoto" (
	"id" text PRIMARY KEY NOT NULL,
	"imageUrl" text NOT NULL,
	"dishId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserPhoto" (
	"id" text PRIMARY KEY NOT NULL,
	"imageUrl" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OrderItem" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"quantity" integer NOT NULL,
	"dishId" text NOT NULL,
	"orderId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Token" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Section" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"chefId" text NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Dish" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"description" text NOT NULL,
	"name" text NOT NULL,
	"price" numeric(5, 2) NOT NULL,
	"sectionId" text NOT NULL,
	"chefId" text NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Address" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"address1" text NOT NULL,
	"address2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipcode" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Hours" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"daysOfWeek" "DaysOfWeekTypeEnum"[]",
	"startTime" text,
	"endTime" text,
	"chefId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Order" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"amount" integer NOT NULL,
	"confirmationNumber" text NOT NULL,
	"paymentMethodId" text NOT NULL,
	"address1" text NOT NULL,
	"address2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipcode" text NOT NULL,
	"eventDate" timestamp(3) NOT NULL,
	"eventTime" text NOT NULL,
	"orderStatus" "OrderStatus" DEFAULT 'PENDING' NOT NULL,
	"userId" text NOT NULL,
	"chefId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"stripeCustomerId" text NOT NULL,
	"role" "RoleType" DEFAULT 'USER' NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_key" (
	"id" text PRIMARY KEY NOT NULL,
	"hashed_password" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"stripeCustomerId" text DEFAULT '' NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"role" "RoleType" DEFAULT 'USER' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Chef" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"stripeAccountId" text NOT NULL,
	"isOnboardingComplete" boolean DEFAULT false NOT NULL,
	"userId" text NOT NULL,
	"onboardingState" "OnboardingState" DEFAULT 'SETUP_STRIPE' NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "DishPhoto_id_key" ON "DishPhoto" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserPhoto_id_key" ON "UserPhoto" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserPhoto_userId_key" ON "UserPhoto" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Section_name_key" ON "Section" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Section_name_chefId_key" ON "Section" ("name","chefId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Dish_name_chefId_key" ON "Dish" ("name","chefId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Address_userId_key" ON "Address" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Order_confirmationNumber_key" ON "Order" ("confirmationNumber");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_email_key" ON "auth_user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_stripeCustomerId_key" ON "auth_user" ("stripeCustomerId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_key_id_key" ON "auth_key" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "auth_key_user_id_idx" ON "auth_key" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_session_id_key" ON "auth_session" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "auth_session_user_id_idx" ON "auth_session" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Chef_userId_key" ON "Chef" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DishPhoto" ADD CONSTRAINT "DishPhoto_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dish"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPhoto" ADD CONSTRAINT "UserPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dish"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Section" ADD CONSTRAINT "Section_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "public"."Chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Dish" ADD CONSTRAINT "Dish_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Dish" ADD CONSTRAINT "Dish_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "public"."Chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Hours" ADD CONSTRAINT "Hours_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "public"."Chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "public"."Chef"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."auth_user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_key" ADD CONSTRAINT "auth_key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chef" ADD CONSTRAINT "Chef_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/