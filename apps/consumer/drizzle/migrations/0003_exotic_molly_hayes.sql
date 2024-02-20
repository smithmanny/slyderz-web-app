ALTER TABLE "dishes" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "sections" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "dishes_to_orders" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes_to_orders" ADD COLUMN "price" numeric(15, 6) NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes_to_orders" ADD COLUMN "image_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes_to_orders" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes_to_orders" ADD COLUMN "quantity" integer NOT NULL;