CREATE TABLE IF NOT EXISTS "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"headshotUrl" text,
	"userId" text
);
--> statement-breakpoint
DROP TABLE "dishPhotos";--> statement-breakpoint
DROP TABLE "userPhotos";--> statement-breakpoint
ALTER TABLE "dishes" ADD COLUMN "imageUrl" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
