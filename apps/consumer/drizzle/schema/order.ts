import { relations } from 'drizzle-orm';
import { date, integer, numeric, pgTable, text, time, timestamp, varchar } from "drizzle-orm/pg-core"

import { dishes, dishesToOrders } from "./menu";
import { chefs, users } from "./user";

export const orders = pgTable("orders", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  subtotal: numeric("subtotal", { precision: 15, scale: 6 }).notNull(),
  total: numeric("total", { precision: 15, scale: 6 }).notNull(),
  serviceFee: numeric("serviceFee", { precision: 15, scale: 6 }).notNull(),
  confirmationNumber: text("confirmation_number").notNull().unique(),
  paymentMethodId: varchar("payment_method_id", { length: 255 }).notNull(),
  address1: text("address1").notNull(),
  address2: text("address2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipcode: text("zipcode").notNull(),
  eventDate: date("event_date").notNull(),
  eventTime: time("event_time", { precision: 3 }).notNull(),
  orderStatus: text("order_status", {
    enum: ['pending', 'accepted', 'completed', 'declined']
  }).default('pending').notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" }),
  chefId: varchar("chef_id", { length: 255 }).notNull().references(() => chefs.id, { onDelete: "restrict", onUpdate: "cascade" }),
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

export const cart = pgTable("cart", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  serviceFee: numeric("service_fee", { precision: 15, scale: 6 }),
  subtotal: numeric("subtotal", { precision: 15, scale: 6 }),
  total: numeric("total", { precision: 15, scale: 6 }),
  eventDate: date("event_date"),
  eventTime: time("event_time", { precision: 6 }),
});
export const cartRelations = relations(cart, ({ many }) => ({
  items: many(cartItems),
}));

export const cartItems = pgTable("cart_items", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  cartId: varchar("cart_id", { length: 255 }).references(() => cart.id).notNull(),
  chefId: varchar("chef_id", { length: 255 }).references(() => chefs.id).notNull(),
  dishId: varchar("dish_id", { length: 255 }).references(() => dishes.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: numeric("price", { precision: 15, scale: 6 }),
  quantity: integer("quantity").notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
});
export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItems.cartId],
    references: [cart.id]
  }),
}));