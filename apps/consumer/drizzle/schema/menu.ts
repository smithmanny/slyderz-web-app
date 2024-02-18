import { pgTable, text, timestamp, boolean, numeric, primaryKey, serial, integer } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

import { chefs } from "drizzle/schema/user";
import { orders } from "./order";

export const sections = pgTable("sections", {
  id: serial("id").unique(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  name: text("name").notNull(),
  chefId: integer("chef_id").notNull().references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
  isActive: boolean("is_active").default(true).notNull(),
},
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chefId, table.name] })
    }
  });
export const sectionsRelations = relations(sections, ({ one, many }) => ({
  chef: one(chefs, {
    fields: [sections.chefId],
    references: [chefs.id]
  }),
  dishes: many(dishes)
}));

export const hours = pgTable("hours", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  daysOfWeek: text("days_of_week", { enum: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'] }).array(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  chefId: integer("chef_id").notNull().references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
export const hoursRelations = relations(hours, ({ one }) => ({
  chef: one(chefs, {
    fields: [hours.chefId],
    references: [chefs.id]
  }),
}));

export const dishes = pgTable("dishes", {
  id: serial("id").unique(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  description: text("description").notNull(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  price: numeric("price", { precision: 5, scale: 2 }).notNull(),
  sectionId: integer("section_id").notNull().references(() => sections.id, { onDelete: "cascade", onUpdate: "cascade" }),
  chefId: integer("chef_id").notNull().references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
  isActive: boolean("is_active").default(true).notNull(),
},
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chefId, table.name] })
    }
  });
export const dishesRelations = relations(dishes, ({ one, many }) => ({
  chef: one(chefs, {
    fields: [dishes.chefId],
    references: [chefs.id],
  }),
  section: one(sections, {
    fields: [dishes.sectionId],
    references: [sections.id]
  }),
  dishesToOrders: many(dishesToOrders)
}));

export const dishesToOrders = pgTable('dishes_to_orders', {
  dishId: integer("dish_id").notNull().references(() => dishes.id),
  orderId: integer("order_id").notNull().references(() => orders.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.dishId, t.orderId] }),
}),
);
export const dishesToOrdersRelations = relations(dishesToOrders, ({ one }) => ({
  order: one(orders, {
    fields: [dishesToOrders.orderId],
    references: [orders.id],
  }),
  dish: one(dishes, {
    fields: [dishesToOrders.dishId],
    references: [dishes.id],
  }),
}));