import lucia from "lucia-auth";
import { idToken } from "@lucia-auth/tokens";
import { nextjs } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import "lucia-auth/polyfill/node";

import prismaClient from "db";

const env = process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD'

export const auth = lucia({
  adapter: prisma(prismaClient),
  env,
  middleware: nextjs(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      stripeCustomerId: userData.stripeCustomerId,
      email: userData.email,
      emailVerified: userData.emailVerified,
      name: userData.name,
      role: userData.role,
    };
  },
});

export const passwordResetToken = idToken(auth, "password_reset", {
  expiresIn: 60 * 60, // 1 hour
});
export const emailVerificationToken = idToken(auth, "email_verification", {
  expiresIn: 60 * 60, // 1 hour
});

export type Auth = typeof auth;
