"use server";

import { z } from "zod";

import { generateVerificationToken } from "app/lib/auth";
import { sendforgotPasswordEmail } from "app/lib/aws";
import { requiredFormData } from "app/lib/utils";
import { db } from "drizzle";

const sendPasswordResetLinkSchema = z.string().email();
export default async function sendPasswordResetLinkMutation(input: FormData) {
	const { email } = requiredFormData<{ email: string }>(input);
	sendPasswordResetLinkSchema.parse(email);

	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.email, email),
	});

	if (!user) {
		return await new Promise((resolve) => setTimeout(resolve, 750));
	}

	const token = await generateVerificationToken(user.id);

	await sendforgotPasswordEmail({
		to: user.email,
		data: {
			resetPasswordUrl: `${
				process.env.NEXT_PUBLIC_URL
			}/reset-password?token=${token.toString()}`,
		},
	});

	return;
}
