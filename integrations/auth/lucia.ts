import { lucia } from "lucia";
import { idToken } from "@lucia-auth/tokens";
import { nextjs } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import "lucia-auth/polyfill/node";

import prismaClient from "db";

const env = process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD'

export const auth = lucia({
  adapter: prisma(prismaClient),
  env,
  middleware: nextjs(),
  getUserAttributes: (userData) => {
    return {
      // userId: userData.id,
      stripeCustomerId: userData.stripeCustomerId,
      email: userData.email,
      emailVerified: userData.emailVerified,
      name: userData.name,
      role: userData.role,
    };
  },
});

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

const generateVerificationToken = async (userId: string) => {
	const storedUserTokens = await db.getTokensByUserId(userId); // github uses 128+ for password reset tokens
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(
				Number(token.expires) - EXPIRES_IN / 2
			);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}

	// you can optionally invalidate all user tokens
	// so only a single valid token exists per user
	// for high security apps

	const token = generateRandomString(64);
	await prismaClient.setToken({
		id: token,
		expires: new Date().getTime() + EXPIRES_IN,
		user_id: userId
	});
	return token;
};

export const passwordResetToken = idToken(auth, "password_reset", {
  expiresIn: 60 * 60, // 1 hour
});
export const emailVerificationToken = idToken(auth, "email_verification", {
  expiresIn: 60 * 60, // 1 hour
});

export type Auth = typeof auth;
