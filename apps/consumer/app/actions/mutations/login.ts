"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

import { auth } from "app/lib/auth";
import { db } from "drizzle";
import { requiredFormData } from "app/lib/utils";

export default async function loginMutation(prevState: any, input: FormData) {
	const { email, password } = requiredFormData<{
		email: string;
		password: string;
	}>(input);

	const foundUser = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.email, email.toLowerCase())
	})
	const argon2id = new Argon2id();

	if (!foundUser) {
		return {
			error: true,
			message: "Wrong email/password combonation"
		}
	}

	try {
		await argon2id.verify(foundUser?.hashedPassword, password)
	} catch {
		return {
			error: true,
			message: "Wrong email/password combonation"
		}
	}
	const session = await auth.createSession(foundUser.id, {})
	const sessionCookie = auth.createSessionCookie(session.id);

	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

	revalidatePath("/");
	redirect("/");
}
