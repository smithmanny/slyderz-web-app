"use server";

import { db } from "drizzle";
import { eq } from "drizzle-orm";

import { auth, validateToken } from "app/lib/auth";
import { TokenError } from "app/lib/errors";
import { createMailjetContact } from "app/lib/mailjet";
import { users } from "drizzle/schema/user";

export default async function verifyEmailMutation(token: string) {
	const userId = await validateToken(token);
	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, userId),
		columns: {
			emailVerified: true,
			email: true,
			name: true,
			id: true
		}
	});

	if (!user) {
		throw new TokenError({
			message: "User not found",
		});
	}

	if (user.emailVerified) {
		throw new TokenError({
			message: "Email is already verified",
		});
	}

	const verifyEmail = db
		.update(users)
		.set({
			emailVerified: true,
		})
		.where(eq(users.id, userId));

	const [x, y, z, session] = await Promise.all([
		auth.invalidateUserSessions(userId),
		verifyEmail,
		createMailjetContact(user.email, user.name),
		auth.createSession(user.id, {}),
	]);

	await fetch(`${process.env.NEXT_PUBLIC_URL}/api/verify-email`, {
		method: "POST",
		body: JSON.stringify({ sessionId: session.id })
	})
}
