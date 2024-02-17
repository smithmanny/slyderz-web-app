import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { isWithinExpiration } from "lucia/utils"; // v2 beta.0
import * as context from "next/headers";
import { cache } from "react";
import { eq } from "drizzle-orm";

import { TokenError } from "app/lib/errors";
import { db } from "drizzle";
import { tokens } from "drizzle/schema/user";
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
		where: (chefs, { eq }) => eq(chefs.userId, session.user.userId),
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

const generateToken = async (userId: string) => {
	const expiresAt = new Date(new Date().getTime() + EXPIRES_IN);

	// delete all user tokens
	// await db.delete(tokens).where(eq(tokens.userId, userId))

	// // const createToken = await db.tokens.create({
	// // 	data: {
	// // 		expiresAt,
	// // 		userId,
	// // 	},
	// // });
	// const createToken = await db.insert(tokens).values({
	// 	userId
	// })

	// return token.id;
};

export const validateToken = async (token: string) => {
	try {
		const storedToken = await db.token.findFirstOrThrow({
			where: { id: token },
		});
		await db.token.delete({ where: { id: token } });

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

export const invalidateAllUserTokens = async (userId: string) => {
	return db.token.deleteMany({ where: { id: userId } });
};

export const generateVerificationToken = async (userId: string) => {
	const storedUserTokens = await db.token.findMany({ where: { userId } });

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

const drizzleAdapter = () => {
	getUser: async (userId: string) => {

	};
	setUser: (user: UserSchema, key: KeySchema | null) => Promise<void>;
	updateUser: (
		userId: string,
		partialUser: Partial<UserSchema>
	) => Promise<void>;
	deleteUser: (userId: string) => Promise<void>;

	getKey: (keyId: string) => Promise<KeySchema | null>;
	getKeysByUserId: (userId: string) => Promise<KeySchema[]>;
	setKey: (key: KeySchema) => Promise<void>;
	updateKey: (keyId: string, partialKey: Partial<KeySchema>) => Promise<void>;
	deleteKey: (keyId: string) => Promise<void>;
	deleteKeysByUserId: (userId: string) => Promise<void>;
}