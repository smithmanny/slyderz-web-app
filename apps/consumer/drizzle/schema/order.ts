import { pgTable, uniqueIndex, pgEnum, text, timestamp, integer } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

import { chefs, users } from "./user";
import { dishesToOrders } from "./menu";

export const orderStatus = pgEnum("order_status", ['PENDING', 'ACCEPTED', 'COMPLETED', 'DECLINED'])

export const orders = pgTable("orders", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
  amount: integer("amount").notNull(),
  confirmationNumber: text("confirmation_number").notNull(),
  paymentMethodId: text("payment_method_id").notNull(),
  address1: text("address1").notNull(),
  address2: text("address2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipcode: text("zipcode").notNull(),
  eventDate: timestamp("event_date", { precision: 3, mode: 'string' }).notNull(),
  eventTime: text("event_time").notNull(),
  orderStatus: orderStatus("order_status").default('PENDING').notNull(),
  userId: text("user_dd").notNull().references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" }),
  chefId: text("chef_id").notNull().references(() => chefs.id, { onDelete: "restrict", onUpdate: "cascade" }),
},
  (table) => {
    return {
      confirmationNumberKey: uniqueIndex("orders_confirmationNumber_key").on(table.confirmationNumber),
    }
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
  dishesToOrders: many(dishesToOrders)
}));