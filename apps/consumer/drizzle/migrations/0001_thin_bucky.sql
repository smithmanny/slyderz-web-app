DO $$ BEGIN
 CREATE TYPE "DaysOfWeekType" AS ENUM('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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

DROP TABLE "_prisma_migrations";
DROP TABLE "auth_key";
ALTER TABLE "Address" RENAME TO "address";
ALTER TABLE "Chef" RENAME TO "chef";
ALTER TABLE "auth_user" RENAME TO "key";
ALTER TABLE "auth_session" RENAME TO "session";
ALTER TABLE "Token" RENAME TO "token";
ALTER TABLE "UserPhoto" RENAME TO "userPhoto";
ALTER TABLE "Hours" RENAME COLUMN "daysOfWeek" TO "daysOfWeekType";
ALTER TABLE "DishPhoto" DROP CONSTRAINT "DishPhoto_dishId_fkey";

ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_dishId_fkey";

ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

ALTER TABLE "Section" DROP CONSTRAINT "Section_chefId_fkey";

ALTER TABLE "Dish" DROP CONSTRAINT "Dish_sectionId_fkey";

ALTER TABLE "Dish" DROP CONSTRAINT "Dish_chefId_fkey";

ALTER TABLE "Hours" DROP CONSTRAINT "Hours_chefId_fkey";

ALTER TABLE "Order" DROP CONSTRAINT "Order_chefId_fkey";

ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

ALTER TABLE "address" DROP CONSTRAINT "Address_userId_fkey";

ALTER TABLE "chef" DROP CONSTRAINT "Chef_userId_fkey";

ALTER TABLE "session" DROP CONSTRAINT "auth_session_user_id_fkey";

ALTER TABLE "token" DROP CONSTRAINT "Token_userId_fkey";

ALTER TABLE "userPhoto" DROP CONSTRAINT "UserPhoto_userId_fkey";

DROP INDEX IF EXISTS "auth_user_email_key";
DROP INDEX IF EXISTS "auth_user_stripeCustomerId_key";
DROP INDEX IF EXISTS "auth_session_id_key";
DROP INDEX IF EXISTS "auth_session_user_id_idx";
ALTER TABLE "OrderItem" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Section" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Dish" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Hours" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Hours" ALTER COLUMN "daysOfWeekType" SET DATA TYPE DaysOfWeekType[];
ALTER TABLE "Order" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "chef" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "token" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "key" ADD COLUMN "hashed_password" text;
ALTER TABLE "key" ADD COLUMN "user_id" text NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_email_key" ON "user" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_stripeCustomerId_key" ON "user" ("stripeCustomerId");
CREATE UNIQUE INDEX IF NOT EXISTS "key_id_key" ON "key" ("id");
CREATE INDEX IF NOT EXISTS "key_user_id_idx" ON "key" ("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "session_id_key" ON "session" ("id");
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "session" ("user_id");
DO $$ BEGIN
 ALTER TABLE "DishPhoto" ADD CONSTRAINT "DishPhoto_dishId_Dish_id_fk" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_dishId_Dish_id_fk" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_Order_id_fk" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Section" ADD CONSTRAINT "Section_chefId_chef_id_fk" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Dish" ADD CONSTRAINT "Dish_sectionId_Section_id_fk" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Dish" ADD CONSTRAINT "Dish_chefId_chef_id_fk" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Hours" ADD CONSTRAINT "Hours_chefId_chef_id_fk" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_chefId_chef_id_fk" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "chef" ADD CONSTRAINT "chef_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "key" ADD CONSTRAINT "key_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userPhoto" ADD CONSTRAINT "userPhoto_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "key" DROP COLUMN IF EXISTS "createdAt";
ALTER TABLE "key" DROP COLUMN IF EXISTS "updatedAt";
ALTER TABLE "key" DROP COLUMN IF EXISTS "name";
ALTER TABLE "key" DROP COLUMN IF EXISTS "email";
ALTER TABLE "key" DROP COLUMN IF EXISTS "stripeCustomerId";
ALTER TABLE "key" DROP COLUMN IF EXISTS "role";
ALTER TABLE "key" DROP COLUMN IF EXISTS "emailVerified";