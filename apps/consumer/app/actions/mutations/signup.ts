"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from 'drizzle-orm';
import { Argon2id } from "oslo/password";

import { auth, generateVerificationToken } from "app/lib/auth";
import { sendSesEmail } from "app/lib/aws";
import { UnknownError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import { requiredFormData } from "app/lib/utils";
import { db } from "drizzle";
import { users } from "drizzle/schema/user";

import { TRANSACTIONAL_EMAILS } from "types";

export default async function signupMutation(input: FormData) {
	const { email, name, password } = requiredFormData<{
		email: string;
		name: string;
		password: string;
	}>(input);
	const stripe = getStripeServer();

	const userExists = await db.select().from(users).where(eq(users.email, email.toLowerCase()))

	if (userExists) {
		throw new Error("User already exists");
	}

	const createUser = async () => {
		const user = await db.transaction(async (tx) => {
			try {
				const stripeCustomer = await stripe.customers.create({
					email: email,
					name,
				});

				const argon2id = new Argon2id();
				const hashedPassword = await argon2id.hash(password);
				const createdUser = await tx.insert(users).values({
					emailVerified: false,
					hashedPassword,
					name: name,
					email: email,
					stripeCustomerId: stripeCustomer.id,
					role: "USER",
				}).returning()

				const user = createdUser[0]
				if (!user) {
					return tx.rollback()
				}

				// Issue email_activation token
				const token = await generateVerificationToken(user.id);

				return {
					userId: user.id,
					name: user.name,
					email: user.email,
					stripeCustomerId: stripeCustomer.id,
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
		})

		return user
	};

	const user = await createUser();
	const activationUrl = `${process.env.NEXT_PUBLIC_URL
		}/email-verification/${user.token.toString()}`;

	sendSesEmail({
		to: email,
		type: TRANSACTIONAL_EMAILS.activation,
		variables: { activationUrl },
	});

	const session = await auth.createSession(user.userId, {});
	const sessionCookie = auth.createSessionCookie(session.id);

	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

	redirect("/")
}
