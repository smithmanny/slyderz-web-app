import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"

import { calendar, dishes, sections } from "./menu";
import { orders } from "./order";

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  role: text("role", {
    enum: ['ADMIN', 'CHEF', 'USER']
  }).default('USER').notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  headshotUrl: varchar("headshot_url", { length: 255 }),
  location: varchar("location", { length: 255 })
});
export const usersRelations = relations(users, ({ one, many }) => ({
  chef: one(chefs),
  address: one(address),
  sessions: many(sessions),
  tokens: many(tokens),
  orders: many(orders)
}));

export const address = pgTable("address", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).defaultNow(),
  address1: varchar("address1", { length: 150 }).notNull(),
  address2: varchar("address2", { length: 150 }),
  city: varchar("city", { length: 150 }).notNull(),
  state: varchar("state", {
    enum: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'],
    length: 150
  }).notNull(),
  zipcode: integer("zipcode").notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id).unique(),
});
export const addressRelations = relations(address, ({ one }) => ({
  user: one(users, {
    fields: [address.userId],
    references: [users.id]
  }),
}));

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  expiresAt: timestamp("expires_at", { mode: 'date', withTimezone: true }).notNull(),
});
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  }),
}));

export const tokens = pgTable("tokens", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  expiresAt: timestamp("expires_at", { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id, { onUpdate: "cascade" }),
})
export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id]
  }),
}));

export const chefs = pgTable("chefs", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  stripeAccountId: text("stripe_account_id").notNull().unique(),
  isOnboardingComplete: boolean("is_onboarding_complete").default(false).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }).unique(),
  onboardingState: text("onboarding_state", {
    enum: ['setup_stripe', 'upload_headshot', 'complete_servsafe']
  }).default('setup_stripe').notNull(),
  description: text("description").default('').notNull(),
});
export const chefsRelations = relations(chefs, ({ one, many }) => ({
  user: one(users, {
    fields: [chefs.userId],
    references: [users.id]
  }),
  calendar: one(calendar),
  sections: many(sections),
  dishes: many(dishes),
  orders: many(orders),
}));