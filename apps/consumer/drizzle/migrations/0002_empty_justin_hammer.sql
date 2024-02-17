ALTER TABLE "dishes" RENAME COLUMN "deleted" TO "isActive";--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "isActive" SET DEFAULT true;