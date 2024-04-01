import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { eq } from "drizzle-orm";
import { Lucia, generateId } from "lucia";
import { cookies } from "next/headers";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { cache } from "react";

import { NotFoundError, TokenError } from "app/lib/errors";
import { db } from "drizzle";
import { sessions, tokens, users } from "drizzle/schema/user";
import { AuthError } from "./errors";

const domain =
	process.env.NODE_ENV === "development" ? "localhost:3000" : "slyderz.co";
const secure = process.env.NODE_ENV === "development" ? false : true;
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const auth = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(30, "d"),
	sessionCookie: {
		expires: false,
		attributes: {
			secure,
			sameSite: "strict",
			domain,
		},
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
			role: userData.role,
		};
	},
});

export const getSession = cache(async () => {
	const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null;

	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const result = await auth.validateSession(sessionId);

	if (result.session?.fresh) {
		const sessionCookie = auth.createSessionCookie(result.session.id);
		cookies().set(sessionCookie);
	}

	return {
		session: result.session,
		user: result.user,
	};
});
export const getProtectedSession = cache(async () => {
	const { session, user } = await getSession();

	if (!session || !user) {
		throw new AuthError();
	}

	return {
		session,
		user,
	};
});
export const getChefSession = cache(async () => {
	const { session, user } = await getProtectedSession();

	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.userId, user.id),
		with: {
			calendar: {
				columns: {
					id: true,
				},
			},
		},
	});

	if (!chef || !chef.calendar) {
		throw new NotFoundError({
			message: "Chef not found",
		});
	}

	return {
		session,
		chef: {
			...chef,
			calendar: {
				...chef.calendar,
			},
		},
	};
});

const generateToken = async (userId: string) => {
	const deleteToken = db.delete(tokens).where(eq(tokens.userId, userId));
	const insertToken = db
		.insert(tokens)
		.values({
			id: generateId(10),
			userId,
			expiresAt: createDate(new TimeSpan(2, "h")),
		})
		.returning({ id: tokens.id });

	const [, generatedToken] = await Promise.all([deleteToken, insertToken]);

	const token = generatedToken[0];

	if (!token) {
		throw new Error("Token not created");
	}

	return token.id;
};

export const validateToken = async (tokenId: string) => {
	const storedToken = await db.query.tokens.findFirst({
		where: (tokens, { eq }) => eq(tokens.id, tokenId),
	});

	if (!storedToken) {
		throw new TokenError({
			message: "Token not found",
		});
	}

	await db.transaction(async (tx) => {
		try {
			await tx.delete(tokens).where(eq(tokens.id, storedToken.id));
		} catch {
			tx.rollback();
		}
	});

	const tokenExpires = storedToken.expiresAt;
	if (!isWithinExpirationDate(tokenExpires)) {
		throw new TokenError({
			message: "Expired token",
		});
	}

	return storedToken.userId;
};

export const invalidateAllUserTokens = async (userId: string) => {
	return await db.delete(tokens).where(eq(tokens.userId, userId));
};

export const invalidateAllUserSessions = async (userId: string) => {
	return await db.delete(sessions).where(eq(sessions.userId, userId));
};

export const generateVerificationToken = async (userId: string) => {
	const storedUserTokens = await db.query.tokens.findMany({
		where: (tokens, { eq }) => eq(tokens.userId, userId),
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

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type DatabaseSessionAttributes = {};
interface DatabaseUserAttributes {
	stripeCustomerId: string;
	email: string;
	emailVerified: boolean;
	name: string;
	role: string;
}
