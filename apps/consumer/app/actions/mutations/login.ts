"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "app/lib/auth";
import { requiredFormData } from "app/lib/utils";
import * as context from "next/headers";

export default async function loginMutation(prevState: any, input: FormData) {
	const { email, password } = requiredFormData<{
		email: string;
		password: string;
	}>(input);

	try {
		const key = await auth.useKey("email", email.toLowerCase(), password);
		const user = await auth.getUser(key.userId);
		const session = await auth.createSession({
			userId: key.userId,
			attributes: {
				stripeCustomerId: user.stripeCustomerId,
				email: user.email,
				emailVerified: user.emailVerified,
				name: user.name,
				role: user.role,
			},
		});

		const authRequest = auth.handleRequest("POST", context);
		authRequest.setSession(session);

		revalidatePath("/");
		redirect("/");
	} catch (err) {
		return {
			error: "Invalid email/password.",
		};
	}
}
