"use server";

import * as context from "next/headers";

import { auth, invalidateAllUserTokens, validateToken } from "app/lib/auth";
import { TokenError } from "app/lib/errors";
import { createMailjetContact } from "app/lib/mailjet";

export default async function verifyEmailMutation(token: string) {
	const authRequest = auth.handleRequest("GET", context);

	const userId = await validateToken(token);
	const [user] = await Promise.all([
		auth.getUser(userId),
		invalidateAllUserTokens(userId),
		auth.updateUserAttributes(userId, {
			emailVerified: true,
		}),
	]);

	if (user.emailVerified) {
		throw new TokenError({
			message: "Email is already verified",
		});
	}

	// Add user to email list
	await createMailjetContact(user.email, user.name);

	const session = await auth.createSession({
		userId,
		attributes: {
			stripeCustomerId: user.stripeCustomerId,
			email: user.email,
			emailVerified: user.emailVerified,
			name: user.name,
			role: user.role,
		},
	});
	authRequest.setSession(session);
}
