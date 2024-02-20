import { pgTable, text, timestamp, integer, serial, numeric } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

import { chefs, users } from "./user";
import { dishesToOrders } from "./menu";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  subtotal: numeric("subtotal", { precision: 15, scale: 6 }).notNull(),
  total: numeric("total", { precision: 15, scale: 6 }).notNull(),
  serviceFee: numeric("serviceFee", { precision: 15, scale: 6 }).notNull(),
  confirmationNumber: text("confirmation_number").notNull().unique(),
  paymentMethodId: text("payment_method_id").notNull(),
  address1: text("address1").notNull(),
  address2: text("address2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipcode: text("zipcode").notNull(),
  eventDate: timestamp("event_date", { precision: 3, mode: 'string' }).notNull(),
  eventTime: text("event_time").notNull(),
  orderStatus: text("order_status", {
    enum: ['PENDING', 'ACCEPTED', 'COMPLETED', 'DECLINED']
  }).default('PENDING').notNull(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" }),
  chefId: integer("chef_id").notNull().references(() => chefs.id, { onDelete: "restrict", onUpdate: "cascade" }),
});
export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id]
  }),
  chef: one(chefs, {
    fields: [orders.chefId],
    references: [chefs.id]
  }),
  dishes: many(dishesToOrders)
}));