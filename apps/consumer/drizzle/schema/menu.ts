import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { chefs } from "drizzle/schema/user";
import { orders } from "./order";

export const sections = pgTable(
  "sections",
  {
    id: varchar("id", { length: 255 }).unique(),
    createdAt: timestamp("created_at", {
      precision: 3,
      mode: "string",
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      precision: 3,
      mode: "string",
    }).defaultNow(),
    name: varchar("name", { length: 255 }).notNull(),
    chefId: varchar("chef_id", { length: 255 })
      .notNull()
      .references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
    isActive: boolean("is_active").default(true).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chefId, table.name] }),
    };
  },
);
export const sectionsRelations = relations(sections, ({ one, many }) => ({
  chef: one(chefs, {
    fields: [sections.chefId],
    references: [chefs.id],
  }),
  dishes: many(dishes),
}));

export const hours = pgTable("hours", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  createdAt: timestamp("created_at", {
    precision: 3,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    mode: "string",
  }).defaultNow(),
  daysOfWeek: text("days_of_week", {
    enum: [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ],
  }).array().notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  chefId: varchar("chef_id", { length: 255 })
    .notNull()
    .references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
export const hoursRelations = relations(hours, ({ one }) => ({
  chef: one(chefs, {
    fields: [hours.chefId],
    references: [chefs.id],
  }),
}));

export const dishes = pgTable(
  "dishes",
  {
    id: varchar("id", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at", {
      precision: 3,
      mode: "string",
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      precision: 3,
      mode: "string",
    }).defaultNow(),
    description: text("description").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    imageUrl: text("image_url").notNull(),
    price: numeric("price", { precision: 15, scale: 6 }).notNull(),
    sectionId: varchar("section_id", { length: 255 })
      .notNull()
      .references(() => sections.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    chefId: varchar("chef_id", { length: 255 })
      .notNull()
      .references(() => chefs.id, { onDelete: "cascade", onUpdate: "cascade" }),
    isActive: boolean("is_active").default(true).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chefId, table.name] }),
    };
  },
);
export const dishesRelations = relations(dishes, ({ one, many }) => ({
  chef: one(chefs, {
    fields: [dishes.chefId],
    references: [chefs.id],
  }),
  section: one(sections, {
    fields: [dishes.sectionId],
    references: [sections.id],
  }),
  dishesToOrders: many(dishesToOrders),
}));

export const dishesToOrders = pgTable(
  "dishes_to_orders",
  {
    dishId: varchar("dish_id", { length: 255 })
      .notNull()
      .references(() => dishes.id),
    orderId: varchar("order_id", { length: 255 })
      .notNull()
      .references(() => orders.id),
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price", { precision: 15, scale: 6 }).notNull(),
    imageUrl: text("image_url").notNull(),
    quantity: integer("quantity").notNull(),
  },
  (t) => ({
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
