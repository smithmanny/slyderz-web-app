import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { isWithinExpiration } from "lucia/utils"; // v2 beta.0
import db from 'db'
import "lucia-auth/polyfill/node";

import prismaClient from "db";

const env = process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD'

export const auth = lucia({
  adapter: prisma(prismaClient, {
		session: 'authSession',
		user: 'authUser',
		key: 'authKey'
	}),
  env,
  middleware: nextjs_future(),
  getUserAttributes: (userData) => {
    return {
      stripeCustomerId: userData.stripeCustomerId,
      email: userData.email,
      emailVerified: userData.emailVerified,
      name: userData.name,
      role: userData.role,
    };
  },
});

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

const generateToken = async (userId: string) => {
	const expiresAt = new Date(new Date().getTime() + EXPIRES_IN)

	// delete all user tokens
	const deleteToken = db.token.deleteMany({ where: { userId } })
	const createToken = db.token.create({
		data: {
			expiresAt,
			userId,
		}
	})

	const [_, token] = await Promise.all([deleteToken, createToken])

	return token.id
};

export const validateToken = async (token: string) => {
	const storedToken = await db.token.findFirstOrThrow({where: {id: token}});
	await db.token.delete({where: {id: token}});

	const tokenExpires = Number(storedToken.expiresAt); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		// should throw a vague error to user (expired *or* invalid token)
		throw new Error("Expired token");
	}
	return storedToken.userId;
};

export const invalidateAllUserTokens = async (userId: string) => {
	return db.token.deleteMany({where: {id: userId}});
};

export const generateVerificationToken = async (userId: string) => {
	const storedUserTokens = await db.token.findMany({ where: { userId } });

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(
				Number(token.expiresAt) - EXPIRES_IN / 2
			);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}

	const token = await generateToken(userId);
	return token
};

export type Auth = typeof auth;
