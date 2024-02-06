"use server";

import { z } from "zod";

import { auth } from "app/lib/auth";
import { generateVerificationToken } from "app/lib/auth";
import { sendSesEmail } from "app/lib/aws";
import prisma from "db";

import { TRANSACTIONAL_EMAILS } from "types";

const sendPasswordResetLinkSchema = z.string().email();
export default async function sendPasswordResetLinkMutation(input: FormData) {
	const email = input.get("email")?.toString();
	sendPasswordResetLinkSchema.parse(email);

	const dbUser = await prisma.authUser.findFirst({
		where: {
			email,
		},
	});

	if (!dbUser) {
		return await new Promise((resolve) => setTimeout(resolve, 750));
	}

	const user = auth.transformDatabaseUser(dbUser);
	const token = await generateVerificationToken(user.userId);

	await sendSesEmail({
		to: user.email,
		type: TRANSACTIONAL_EMAILS.forgotPassword,
		variables: {
			resetPasswordUrl: `${
				process.env.NEXT_PUBLIC_URL
			}/reset-password?token=${token.toString()}`,
		},
	});

	return;
}
