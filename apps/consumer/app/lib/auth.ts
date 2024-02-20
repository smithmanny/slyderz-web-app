import { cookies } from "next/headers";
import { cache } from "react";
import { Lucia } from "lucia";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { eq } from "drizzle-orm";

import { TokenError } from "app/lib/errors";
import { db } from "drizzle";
import { AuthError } from "./errors";
import { tokens, users, sessions } from "drizzle/schema/user";

const domain = process.env.NODE_ENV === "development" ? "localhost:3000" : "slyderz.co";
const secure = process.env.NODE_ENV === "development" ? false : true;
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const auth = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(30, "d"),
	sessionCookie: {
		expires: false,
		attributes: {
			secure,
			sameSite: "strict",
			domain
		}
	},
	getSessionAttributes: (databaseSession: DatabaseSessionAttributes) => {
		return {};
	},
	getUserAttributes: (userData: DatabaseUserAttributes) => {
		return {
			stripeCustomerId: userData.stripeCustomerId,
			email: userData.email,
			emailVerified: userData.emailVerified,
			name: userData.name,
			userId: userData.userId,
		};
	},
});

export const getSession = cache(async () => {
	const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null
	if (!sessionId) {
		return {
			user: null,
			session: null
		};
	}

	const result = await auth.validateSession(sessionId as unknown as number);

	if (result.session && result.session.fresh) {
		return {
			session: result.session,
			user: result.user
		}
	}

	return {
		user: null,
		session: null
	};
});
export const getProtectedSession = cache(async () => {
	const { session, user } = await getSession()

	if (!session) {
		throw new AuthError();
	}

	return {
		session,
		user
	};
});
export const getChefSession = cache(async () => {
	const { session, user } = await getSession();

	if (!session) {
		throw new AuthError();
	}

	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.userId, user.userId),
	});

	if (!chef) {
		throw new Error("Chef not found")
	}

	return {
		session,
		chef,
	};
});

const generateToken = async (userId: number) => {
	const tokenId = await db.transaction(async (tx) => {
		try {
			// delete all user tokens
			const deleteToken = tx.delete(tokens).where(eq(tokens.userId, userId))
			const insertToken = tx.insert(tokens).values({
				userId: Number(userId),
				expiresAt: createDate(new TimeSpan(2, "h"))
			}).returning({ id: tokens.id })

			const [undefined, generatedToken] = await Promise.all([deleteToken, insertToken])
			const token = generatedToken[0]

			if (!token) {
				return tx.rollback();
			}

			return token.id;
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
					id: storedToken.id,
					expiresAt: createDate(new TimeSpan(2, "h")),
					userId: storedToken.userId
				})

				await Promise.all([deleteToken, insertToken])

			} catch (err) {
				return tx.rollback()
			}
		})

		const tokenExpires = storedToken.expiresAt;
		if (!isWithinExpirationDate(tokenExpires)) {
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

export const invalidateAllUserSessions = async (userId: number) => {
	return await db.delete(sessions).where(eq(sessions.userId, userId))
};

export const generateVerificationToken = async (userId: number) => {
	const storedUserTokens = await db.query.tokens.findMany({
		where: (tokens, { eq }) => eq(tokens.userId, userId)
	});

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpirationDate(createDate(new TimeSpan(1, "h")));
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}

	const token = await generateToken(userId);
	return token;
};

export type Auth = typeof auth;

declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseSessionAttributes {
}
interface DatabaseUserAttributes {
	stripeCustomerId: string;
	email: string;
	emailVerified: boolean;
	name: string;
	userId: number;
}