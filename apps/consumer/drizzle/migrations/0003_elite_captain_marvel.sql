CREATE TABLE IF NOT EXISTS "cart" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"service_fee" numeric(15, 6),
	"subtotal" numeric(15, 6),
	"total" numeric(15, 6),
	"event_date" date,
	"event_time" time(6),
	CONSTRAINT "cart_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart_items" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"cart_id" varchar(255) NOT NULL,
	"chef_id" varchar(255) NOT NULL,
	"dish_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric(15, 6),
	"quantity" integer NOT NULL,
	"image_url" varchar(255) NOT NULL,
	CONSTRAINT "cart_items_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_chef_id_chefs_id_fk" FOREIGN KEY ("chef_id") REFERENCES "chefs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
