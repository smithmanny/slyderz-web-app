"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

import { auth } from "app/lib/auth";
import { requiredFormData } from "app/lib/utils";
import { db } from "drizzle";

export default async function loginMutation(input: FormData) {
	const { email, password } = requiredFormData<{
		email: string;
		password: string;
	}>(input);

	const foundUser = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.email, email.toLowerCase()),
	});

	if (!foundUser) {
		return {
			error: true,
			message: "Wrong email/password combonation",
		};
	}

	try {
		const validPassword = await new Argon2id().verify(
			foundUser.hashedPassword,
			password,
		);
		if (!validPassword) {
			return {
				error: true,
				message: "Wrong email/password combonation",
			};
		}
	} catch {
		return {
			error: true,
			message: "Wrong email/password combonation",
		};
	}
	const session = await auth.createSession(foundUser.id, {});
	const sessionCookie = auth.createSessionCookie(session.id);

	cookies().set(sessionCookie);

	redirect("/");
}
