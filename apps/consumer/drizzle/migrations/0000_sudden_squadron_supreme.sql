CREATE TABLE IF NOT EXISTS "dishes" (
	"id" varchar(255),
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"description" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"image_url" text NOT NULL,
	"price" numeric(15, 6) NOT NULL,
	"section_id" varchar(255) NOT NULL,
	"chef_id" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "dishes_chef_id_name_pk" PRIMARY KEY("chef_id","name"),
	CONSTRAINT "dishes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes_to_orders" (
	"dish_id" varchar(255) NOT NULL,
	"order_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric(15, 6) NOT NULL,
	"image_url" text NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "dishes_to_orders_dish_id_order_id_pk" PRIMARY KEY("dish_id","order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hours" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"days_of_week" text[],
	"start_time" text,
	"end_time" text,
	"chef_id" varchar(255) NOT NULL,
	CONSTRAINT "hours_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" varchar(255),
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"name" varchar(255) NOT NULL,
	"chef_id" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "sections_chef_id_name_pk" PRIMARY KEY("chef_id","name"),
	CONSTRAINT "sections_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"subtotal" numeric(15, 6) NOT NULL,
	"total" numeric(15, 6) NOT NULL,
	"serviceFee" numeric(15, 6) NOT NULL,
	"confirmation_number" text NOT NULL,
	"payment_method_id" varchar(255) NOT NULL,
	"address1" text NOT NULL,
	"address2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipcode" text NOT NULL,
	"event_date" timestamp(3) NOT NULL,
	"event_time" text NOT NULL,
	"order_status" text DEFAULT 'PENDING' NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"chef_id" varchar(255) NOT NULL,
	CONSTRAINT "orders_id_unique" UNIQUE("id"),
	CONSTRAINT "orders_confirmation_number_unique" UNIQUE("confirmation_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chefs" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"stripe_account_id" text NOT NULL,
	"is_onboarding_complete" boolean DEFAULT false NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"onboarding_state" text DEFAULT 'SETUP_STRIPE' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "chefs_id_unique" UNIQUE("id"),
	CONSTRAINT "chefs_stripe_account_id_unique" UNIQUE("stripe_account_id"),
	CONSTRAINT "chefs_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"stripe_customer_id" text DEFAULT '' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"role" text DEFAULT 'USER' NOT NULL,
	CONSTRAINT "sessions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	CONSTRAINT "tokens_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"hashed_password" varchar(255) NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"role" text DEFAULT 'USER' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"headshot_url" varchar(255),
	"location" varchar(255),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
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
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE restrict ON UPDATE cascade;
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
 ALTER TABLE "chefs" ADD CONSTRAINT "chefs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
