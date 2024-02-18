CREATE TABLE IF NOT EXISTS "dishes" (
	"id" serial NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"description" text NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"price" numeric(5, 2) NOT NULL,
	"section_id" serial NOT NULL,
	"chef_id" serial NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "dishes_chef_id_name_pk" PRIMARY KEY("chef_id","name"),
	CONSTRAINT "dishes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes_to_orders" (
	"dish_id" serial NOT NULL,
	"order_id" serial NOT NULL,
	CONSTRAINT "dishes_to_orders_dish_id_order_id_pk" PRIMARY KEY("dish_id","order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hours" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"days_of_week" text[],
	"start_time" text,
	"end_time" text,
	"chef_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" serial NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"name" text NOT NULL,
	"chef_id" serial NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "sections_chef_id_name_pk" PRIMARY KEY("chef_id","name"),
	CONSTRAINT "sections_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
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
	"order_status" text DEFAULT 'PENDING' NOT NULL,
	"user_id" serial NOT NULL,
	"chef_id" serial NOT NULL,
	CONSTRAINT "orders_confirmation_number_unique" UNIQUE("confirmation_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chefs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"stripe_account_id" text NOT NULL,
	"is_onboarding_complete" boolean DEFAULT false NOT NULL,
	"user_id" serial NOT NULL,
	"onboarding_state" text DEFAULT 'SETUP_STRIPE' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "chefs_stripe_account_id_unique" UNIQUE("stripe_account_id"),
	CONSTRAINT "chefs_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"hashed_password" text,
	"user_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"stripe_customer_id" text DEFAULT '' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"role" text DEFAULT 'USER' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"expires_at" timestamp(3) DEFAULT now() NOT NULL,
	"user_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT now(),
	"updated_at" timestamp(3) DEFAULT now(),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"role" text DEFAULT 'USER' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"headshot_url" text,
	"location" text,
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
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;