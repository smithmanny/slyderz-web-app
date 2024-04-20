CREATE TABLE IF NOT EXISTS "address" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"created_at" timestamp(6) DEFAULT now(),
	"updated_at" timestamp(6) DEFAULT now(),
	"address1" varchar(150) NOT NULL,
	"address2" varchar(150) NOT NULL,
	"city" varchar(150) NOT NULL,
	"state" varchar(150) NOT NULL,
	"zipcode" integer NOT NULL,
	"user_id" varchar(255) NOT NULL,
	CONSTRAINT "address_id_unique" UNIQUE("id"),
	CONSTRAINT "address_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
