ALTER TABLE "hours" ALTER COLUMN "calendar_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hours" ADD CONSTRAINT "hours_calendar_id_calendar_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "calendar"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
