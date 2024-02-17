ALTER TABLE "DishPhoto" RENAME TO "dishPhotos";--> statement-breakpoint
ALTER TABLE "Dish" RENAME TO "dishes";--> statement-breakpoint
ALTER TABLE "Hours" RENAME TO "hours";--> statement-breakpoint
ALTER TABLE "Section" RENAME TO "sections";--> statement-breakpoint
ALTER TABLE "OrderItem" RENAME TO "orderItem";--> statement-breakpoint
ALTER TABLE "Order" RENAME TO "orders";--> statement-breakpoint
ALTER TABLE "chef" RENAME TO "chefs";--> statement-breakpoint
ALTER TABLE "key" RENAME TO "keys";--> statement-breakpoint
ALTER TABLE "session" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "token" RENAME TO "tokens";--> statement-breakpoint
ALTER TABLE "userPhoto" RENAME TO "userPhotos";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "address" DROP CONSTRAINT "address_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "dishPhotos" DROP CONSTRAINT "DishPhoto_dishId_Dish_id_fk";
--> statement-breakpoint
ALTER TABLE "dishes" DROP CONSTRAINT "Dish_sectionId_Section_id_fk";
--> statement-breakpoint
ALTER TABLE "dishes" DROP CONSTRAINT "Dish_chefId_chef_id_fk";
--> statement-breakpoint
ALTER TABLE "hours" DROP CONSTRAINT "Hours_chefId_chef_id_fk";
--> statement-breakpoint
ALTER TABLE "sections" DROP CONSTRAINT "Section_chefId_chef_id_fk";
--> statement-breakpoint
ALTER TABLE "orderItem" DROP CONSTRAINT "OrderItem_dishId_Dish_id_fk";
--> statement-breakpoint
ALTER TABLE "orderItem" DROP CONSTRAINT "OrderItem_orderId_Order_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "Order_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "Order_chefId_chef_id_fk";
--> statement-breakpoint
ALTER TABLE "chefs" DROP CONSTRAINT "chef_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "keys" DROP CONSTRAINT "key_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "tokens" DROP CONSTRAINT "token_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userPhotos" DROP CONSTRAINT "userPhoto_userId_user_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "Address_userId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "DishPhoto_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Dish_name_chefId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Section_name_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Section_name_chefId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Order_confirmationNumber_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Chef_userId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "key_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "key_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "session_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "session_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "UserPhoto_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "UserPhoto_userId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "auth_user_email_key";--> statement-breakpoint
DROP INDEX IF EXISTS "auth_user_stripeCustomerId_key";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "address_userId_key" ON "address" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "dishPhotos_id_key" ON "dishPhotos" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "dishes_name_chefId_key" ON "dishes" ("name","chefId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sections_name_key" ON "sections" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sections_name_chefId_key" ON "sections" ("name","chefId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "orders_confirmationNumber_key" ON "orders" ("confirmationNumber");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "chefs_userId_key" ON "chefs" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "keys_id_key" ON "keys" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "keys_user_id_idx" ON "keys" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sessions_id_key" ON "sessions" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "userPhotos_id_key" ON "userPhotos" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "userPhotos_userId_key" ON "userPhotos" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_stripeCustomerId_key" ON "users" ("stripeCustomerId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishPhotos" ADD CONSTRAINT "dishPhotos_dishId_dishes_id_fk" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes" ADD CONSTRAINT "dishes_sectionId_sections_id_fk" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes" ADD CONSTRAINT "dishes_chefId_chefs_id_fk" FOREIGN KEY ("chefId") REFERENCES "chefs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hours" ADD CONSTRAINT "hours_chefId_chefs_id_fk" FOREIGN KEY ("chefId") REFERENCES "chefs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections" ADD CONSTRAINT "sections_chefId_chefs_id_fk" FOREIGN KEY ("chefId") REFERENCES "chefs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_dishId_dishes_id_fk" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_chefId_chefs_id_fk" FOREIGN KEY ("chefId") REFERENCES "chefs"("id") ON DELETE restrict ON UPDATE cascade;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userPhotos" ADD CONSTRAINT "userPhotos_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
