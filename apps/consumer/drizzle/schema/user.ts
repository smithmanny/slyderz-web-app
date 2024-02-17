import { pgTable, text, timestamp, boolean, bigint, serial } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

import { hours, sections, dishes } from "./menu";
import { orders } from "./order";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  role: text("role", {
    enum: ['ADMIN', 'CHEF', 'USER']
  }).default('USER').notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  headshotUrl: text("headshot_url"),
  location: text("location")
});
export const usersRelations = relations(users, ({ one, many }) => ({
  keys: many(keys),
  sessions: many(sessions),
  tokens: many(tokens),
  orders: many(orders)
}));

export const keys = pgTable("keys", {
  id: serial("id").primaryKey(),
  hashedPassword: text("hashed_password"),
  userId: serial("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
export const keysRelations = relations(keys, ({ one }) => ({
  user: one(users, {
    fields: [keys.userId],
    references: [users.id]
  }),
}));

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
  email: text("email").default('').notNull(),
  name: text("name").default('').notNull(),
  stripeCustomerId: text("stripe_customer_id").default('').notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  role: text("role", {
    enum: ['ADMIN', 'CHEF', 'USER']
  }).default('USER').notNull(),
});
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  }),
}));

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  expiresAt: timestamp("expires_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  userId: serial("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id]
  }),
}));

export const chefs = pgTable("chefs", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow(),
  stripeAccountId: text("stripe_account_id").notNull().unique(),
  isOnboardingComplete: boolean("is_onboarding_complete").default(false).notNull(),
  userId: serial("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }).unique(),
  onboardingState: text("onboarding_state", {
    enum: ['SETUP_STRIPE', 'UPLOAD_HEADSHOT', 'COMPLETE_SERVSAFE']
  }).default('SETUP_STRIPE').notNull(),
  description: text("description").default('').notNull(),
});
export const chefsRelations = relations(chefs, ({ one, many }) => ({
  user: one(users, {
    fields: [chefs.userId],
    references: [users.id]
  }),
  hours: many(hours),
  sections: many(sections),
  dishes: many(dishes),
  orders: many(orders),
}));