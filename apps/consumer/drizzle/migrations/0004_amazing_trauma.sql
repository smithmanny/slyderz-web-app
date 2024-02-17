ALTER TABLE "orderItem" RENAME TO "orderItems";--> statement-breakpoint
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItem_dishId_dishes_id_fk";
--> statement-breakpoint
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItem_orderId_orders_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_dishId_dishes_id_fk" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
