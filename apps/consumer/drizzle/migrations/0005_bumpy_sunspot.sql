DROP TABLE "address";--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "createdAt" timestamp(3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "updatedAt" timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "location" text;