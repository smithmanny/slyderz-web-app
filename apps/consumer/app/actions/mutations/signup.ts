"use server";

import * as context from "next/headers";

import { auth, generateVerificationToken } from "app/lib/auth";
import { sendSesEmail } from "app/lib/aws";
import { UnknownError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import { requiredFormData } from "app/lib/utils";
import prisma from "db";

import { TRANSACTIONAL_EMAILS } from "types";
import { RoleType } from ".prisma/client";

export default async function signupMutation(input: FormData) {
	const { email, name, password } = requiredFormData<{
		email: string;
		name: string;
		password: string;
	}>(input);
	const stripe = getStripeServer();

	const userExists = await prisma.authUser.findFirst({
		where: {
			email,
		},
	});

	if (userExists) {
		throw new Error("User already exists");
	}

	const createUser = async () => {
		try {
			let stripeCustomerId = "";

			if (email === "shakhorsmith@gmail.com") {
				stripeCustomerId = "cus_LpSKis9bilj3rP";
			}

			if (!stripeCustomerId) {
				const stripeCustomer = await stripe.customers.create({
					email: email,
					name,
				});

				stripeCustomerId = stripeCustomer.id;
			}

			const user = await auth.createUser({
				key: {
					providerId: "email",
					providerUserId: email.toLowerCase(),
					password,
				},
				attributes: {
					emailVerified: false,
					name: name,
					email: email,
					stripeCustomerId,
					role: RoleType.USER,
				},
			});

			// Issue email_activation token
			const token = await generateVerificationToken(user.userId);

			return {
				userId: user.userId,
				name: user.name,
				email: user.email,
				stripeCustomerId: stripeCustomerId,
				emailVerified: user.emailVerified,
				role: user.role,
				token,
			};
		} catch (err) {
			throw new UnknownError({
				message: "User not created",
				cause: err,
			});
		}
	};

	const user = await createUser();
	const activationUrl = `${
		process.env.NEXT_PUBLIC_URL
	}/email-verification/${user.token.toString()}`;
	sendSesEmail({
		to: email,
		type: TRANSACTIONAL_EMAILS.activation,
		variables: { activationUrl },
	});

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
	const authRequest = auth.handleRequest("POST", context);
	authRequest.setSession(session);

	return user.userId;
}
