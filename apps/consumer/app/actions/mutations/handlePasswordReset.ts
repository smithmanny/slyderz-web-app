"use server";

import * as context from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { invalidateAllUserTokens, validateToken } from "app/lib/auth";
import { auth } from "app/lib/auth";
import { sendSesEmail } from "app/lib/aws";
import { TokenError, UnknownError } from "app/lib/errors";
import { requiredFormData } from "app/lib/utils";

import { TRANSACTIONAL_EMAILS } from "types";

const ResetPasswordFormSchema = z.object({
	password: z.string(),
	passwordConfirmation: z.string(),
});
export default async function handlePasswordResetMutation(
	token: string,
	input: FormData,
) {
	ResetPasswordFormSchema.parse(Object.fromEntries(input.entries()));
	const { password } = requiredFormData<{ password: string }>(input);

	try {
		const userId = await validateToken(token);
		const user = await auth.getUser(userId);

		// Invalidate all sessions, user tokens and update password
		await Promise.all([
			auth.invalidateAllUserSessions(user.userId),
			invalidateAllUserTokens(user.userId),
			auth.updateKeyPassword("email", user.email, password),
		]).catch((err) => {
			throw new UnknownError({
				message: "Please try again",
				cause: err,
			});
		});

		// update key
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {
				stripeCustomerId: user.stripeCustomerId,
				email: user.email,
				emailVerified: user.emailVerified,
				name: user.name,
				role: user.role,
			},
		});
		const authRequest = auth.handleRequest("GET", context);
		authRequest.setSession(session);

		await sendSesEmail({
			to: user.email,
			type: TRANSACTIONAL_EMAILS.passwordReset,
		});
	} catch (e) {
		if (e instanceof TokenError && e.message === "Expired token") {
			throw new TokenError({
				cause: e,
			});
		}
		if (e instanceof TokenError && e.message === "Invalid token") {
			throw new TokenError({
				cause: e,
			});
		}
	}

	redirect("/");
}
