import { pgTable, uniqueIndex, pgEnum, text, timestamp, boolean, index, bigint } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

import { hours, sections, dishes } from "./menu";
import { orders } from "./order";

export const roleType = pgEnum("RoleType", ['ADMIN', 'CHEF', 'USER'])
export const onboardingState = pgEnum("onboarding_state", ['SETUP_STRIPE', 'UPLOAD_HEADSHOT', 'COMPLETE_SERVSAFE'])

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  stripeCustomerId: text("stripe_customer_id").notNull(),
  role: roleType("role").default('USER').notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  headshotUrl: text("headshot_url"),
  location: text("location")
},
  (table) => {
    return {
      emailKey: uniqueIndex("users_email_key").on(table.email),
      stripeCustomerIdKey: uniqueIndex("users_stripeCustomerId_key").on(table.stripeCustomerId),
    }
  });
export const usersRelations = relations(users, ({ one, many }) => ({
  keys: many(keys),
  sessions: many(sessions),
  tokens: many(tokens),
  orders: many(orders)
}));

export const keys = pgTable("keys", {
  id: text("id").primaryKey().notNull(),
  hashedPassword: text("hashed_password"),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
},
  (table) => {
    return {
      idKey: uniqueIndex("keys_id_key").on(table.id),
      userIdIdx: index("keys_user_id_idx").on(table.userId),
    }
  });
export const keysRelations = relations(keys, ({ one }) => ({
  user: one(users, {
    fields: [keys.userId],
    references: [users.id]
  }),
}));

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
  email: text("email").default('').notNull(),
  name: text("name").default('').notNull(),
  stripeCustomerId: text("stripe_customer_id").default('').notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  role: roleType("role").default('USER').notNull(),
},
  (table) => {
    return {
      idKey: uniqueIndex("sessions_id_key").on(table.id),
      userIdIdx: index("sessions_user_id_idx").on(table.userId),
    }
  });
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  }),
}));

export const tokens = pgTable("tokens", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id]
  }),
}));

export const chefs = pgTable("chefs", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
  stripeAccountId: text("stripe_account_id").notNull(),
  isOnboardingComplete: boolean("is_onboarding_complete").default(false).notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  onboardingState: onboardingState("onboarding_state").default('SETUP_STRIPE').notNull(),
  description: text("description").default('').notNull(),
},
  (table) => {
    return {
      userIdKey: uniqueIndex("chefs_userId_key").on(table.userId),
    }
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