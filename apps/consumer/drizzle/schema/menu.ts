import { pgTable, uniqueIndex, pgEnum, text, timestamp, boolean, numeric, primaryKey } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

import { chefs } from "drizzle/schema/user";
import { orders } from "./order";

export const daysOfWeekType = pgEnum("days_of_week_type", ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'])

export const sections = pgTable("sections", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  name: text("name").notNull(),
  chefId: text("chef_id").notNull().references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
  isActive: boolean("is_active").default(true).notNull(),
},
  (table) => {
    return {
      nameKey: uniqueIndex("sections_name_key").on(table.name),
      nameChefIdKey: uniqueIndex("sections_name_chefId_key").on(table.name, table.chefId),
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
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  daysOfWeek: daysOfWeekType("days_of_week_type").array(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  chefId: text("chef_id").notNull().references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
export const hoursRelations = relations(hours, ({ one }) => ({
  chef: one(chefs, {
    fields: [hours.chefId],
    references: [chefs.id]
  }),
}));

export const dishes = pgTable("dishes", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  description: text("description").notNull(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  price: numeric("price", { precision: 5, scale: 2 }).notNull(),
  sectionId: text("section_id").notNull().references(() => sections.id, { onDelete: "cascade", onUpdate: "cascade" }),
  chefId: text("chef_id").notNull().references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
  isActive: boolean("is_active").default(true).notNull(),
},
  (table) => {
    return {
      nameChefIdKey: uniqueIndex("dishes_name_chefId_key").on(table.name, table.chefId),
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
  dishId: text('dish_id').notNull().references(() => dishes.id),
  orderId: text('order_id').notNull().references(() => orders.id),
}, (t) => ({
  pk: primaryKey(t.dishId, t.orderId),
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