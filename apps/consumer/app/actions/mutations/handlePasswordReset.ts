"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { Argon2id } from "oslo/password";

import { invalidateAllUserTokens, validateToken } from "app/lib/auth";
import { auth, invalidateAllUserSessions } from "app/lib/auth";
import { db } from "drizzle";
import { users } from "drizzle/schema/user";
import { sendSesEmail } from "app/lib/aws";
import { TokenError, UnknownError } from "app/lib/errors";
import { requiredFormData } from "app/lib/utils";

import { TRANSACTIONAL_EMAILS } from "types";

const ResetPasswordFormSchema = z.object({
	password: z.string(),
	passwordConfirmation: z.string(),
});
export default async function handlePasswordResetMutation(
	token: number,
	input: FormData,
) {
	ResetPasswordFormSchema.parse(Object.fromEntries(input.entries()));
	const { password } = requiredFormData<{ password: string }>(input);

	try {
		const userId = await validateToken(token);
		const user = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.id, userId)
		})

		if (!user) {
			throw new Error("User not found")
		}

		const argon2id = new Argon2id();
		const hashedPassword = await argon2id.hash(password);
		const updatePassword = db.update(users).set({
			hashedPassword
		})
			.where(eq(users.id, user.id))

		// Invalidate all sessions, user tokens and update password
		await Promise.all([
			invalidateAllUserSessions(user.id),
			invalidateAllUserTokens(user.id),
			updatePassword,
		]).catch((err) => {
			throw new UnknownError({
				message: "Please try again",
				cause: err,
			});
		});

		const session = await auth.createSession(user.id, {})
		const sessionCookie = auth.createSessionCookie(session.id)
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

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

	revalidatePath("/")
	redirect("/");
}
