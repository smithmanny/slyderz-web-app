import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { isWithinExpiration } from "lucia/utils"; // v2 beta.0
import * as context from "next/headers";
import { cache } from "react";
import { eq } from "drizzle-orm";

import { TokenError } from "app/lib/errors";
import { db } from "drizzle";
import { tokens, users, keys } from "drizzle/schema/user";
import prismaClient from "db";
import { AuthError } from "./errors";

import "lucia/polyfill/node";

const env = process.env.NODE_ENV === "development" ? "DEV" : "PROD";

export const auth = lucia({
	adapter: prisma(prismaClient, {
		session: "authSession",
		user: "authUser",
		key: "authKey",
	}),
	env,
	middleware: nextjs_future(),
	sessionCookie: {
		expires: false,
	},
	getSessionAttributes: (databaseSession) => {
		return {
			stripeCustomerId: databaseSession.stripeCustomerId,
			emailVeried: databaseSession.emailVerified,
			email: databaseSession.email,
			name: databaseSession.name,
		};
	},
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

export const getSession = cache(() => {
	const authRequest = auth.handleRequest("GET", context);
	return authRequest.validate();
});
export const getProtectedSession = cache(async () => {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();

	if (!session) {
		throw new AuthError();
	}

	return session;
});
export const getChefSession = cache(async () => {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();

	if (!session) {
		throw new AuthError();
	}

	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.userId, Number(session.user.userId)),
	});

	if (!chef) {
		throw new Error("Chef not found")
	}

	return {
		session,
		chef,
	};
});

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

const generateToken = async (userId: number) => {
	const expiresAt = new Date(new Date().getTime() + EXPIRES_IN).toISOString();

	const tokenId = await db.transaction(async (tx) => {
		try {
			// delete all user tokens
			const deleteToken = tx.delete(tokens).where(eq(tokens.userId, userId))
			const insertToken = tx.insert(tokens).values({
				userId: Number(userId),
				expiresAt
			}).returning({ id: tokens.id })

			const [undefined, token] = await Promise.all([deleteToken, insertToken])

			if (!token) {
				return tx.rollback();
			}

			return token[0]?.id;
		} catch (err) {
			return tx.rollback();
		}
	})

	return tokenId
};

export const validateToken = async (tokenId: number) => {
	try {
		const storedToken = await db.query.tokens.findFirst({
			where: (tokens, { eq }) => eq(tokens.id, tokenId),
		});

		if (!storedToken) {
			throw new Error("Token not found")
		}

		await db.transaction(async (tx) => {
			try {
				const deleteToken = tx.delete(tokens).where(eq(tokens.id, storedToken.id))
				const insertToken = db.insert(tokens).values({
					id: storedToken.id
				})

				await Promise.all([deleteToken, insertToken])

			} catch (err) {
				return tx.rollback()
			}
		})

		const tokenExpires = Number(storedToken.expiresAt); // bigint => number conversion
		if (!isWithinExpiration(tokenExpires)) {
			// should throw a vague error to user (expired *or* invalid token)
			throw new TokenError({
				message: "Expired token",
			});
		}

		return storedToken.userId;
	} catch (err) {
		throw new TokenError({
			message: "Invalid token",
			cause: err,
		});
	}
};

export const invalidateAllUserTokens = async (userId: number) => {
	return await db.delete(tokens).where(eq(tokens.userId, userId))
};

export const generateVerificationToken = async (userId: number) => {
	const storedUserTokens = await db.query.tokens.findMany({
		where: (tokens, { eq }) => eq(tokens.userId, userId)
	});

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expiresAt) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}

	const token = await generateToken(userId);
	return token;
};

export type Auth = typeof auth;