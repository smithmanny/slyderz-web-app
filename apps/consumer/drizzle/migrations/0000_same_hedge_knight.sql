DO $$ BEGIN
 CREATE TYPE "DaysOfWeekType" AS ENUM('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
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
DO $$ BEGIN
 CREATE TYPE "RoleType" AS ENUM('ADMIN', 'CHEF', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Dish" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"description" text NOT NULL,
	"name" text NOT NULL,
	"price" numeric(5, 2) NOT NULL,
	"sectionId" text NOT NULL,
	"chefId" text NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DishPhoto" (
	"id" text PRIMARY KEY NOT NULL,
	"imageUrl" text NOT NULL,
	"dishId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Hours" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"daysOfWeekType" DaysOfWeekType[],
	"startTime" text,
	"endTime" text,
	"chefId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Section" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"chefId" text NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Order" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
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
CREATE TABLE IF NOT EXISTS "OrderItem" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"quantity" integer NOT NULL,
	"dishId" text NOT NULL,
	"orderId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"address1" text NOT NULL,
	"address2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipcode" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chef" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"stripeAccountId" text NOT NULL,
	"isOnboardingComplete" boolean DEFAULT false NOT NULL,
	"userId" text NOT NULL,
	"onboardingState" "OnboardingState" DEFAULT 'SETUP_STRIPE' NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "key" (
	"id" text PRIMARY KEY NOT NULL,
	"hashed_password" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
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
CREATE TABLE IF NOT EXISTS "token" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"stripeCustomerId" text NOT NULL,
	"role" "RoleType" DEFAULT 'USER' NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userPhoto" (
	"id" text PRIMARY KEY NOT NULL,
	"imageUrl" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Dish_name_chefId_key" ON "Dish" ("name","chefId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "DishPhoto_id_key" ON "DishPhoto" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Section_name_key" ON "Section" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Section_name_chefId_key" ON "Section" ("name","chefId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Order_confirmationNumber_key" ON "Order" ("confirmationNumber");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Address_userId_key" ON "address" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Chef_userId_key" ON "chef" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "key_id_key" ON "key" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "key_user_id_idx" ON "key" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "session_id_key" ON "session" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_email_key" ON "user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_stripeCustomerId_key" ON "user" ("stripeCustomerId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserPhoto_id_key" ON "userPhoto" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserPhoto_userId_key" ON "userPhoto" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Dish" ADD CONSTRAINT "Dish_sectionId_Section_id_fk" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Dish" ADD CONSTRAINT "Dish_chefId_chef_id_fk" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DishPhoto" ADD CONSTRAINT "DishPhoto_dishId_Dish_id_fk" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Hours" ADD CONSTRAINT "Hours_chefId_chef_id_fk" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Section" ADD CONSTRAINT "Section_chefId_chef_id_fk" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_chefId_chef_id_fk" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_dishId_Dish_id_fk" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_Order_id_fk" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chef" ADD CONSTRAINT "chef_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "key" ADD CONSTRAINT "key_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userPhoto" ADD CONSTRAINT "userPhoto_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
