"use server";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

	const fetchUser = await db
		.select()
		.from(users)
		.where(eq(users.email, email.toLowerCase()));
	const userExists = fetchUser[0];

	if (userExists) {
		throw new Error("User already exists");
	}

	const createUser = async () => {
		const isAdmin =
			process.env.NODE_ENV === "development" &&
			email === "shakhorsmith@gmail.com";
		const user = await db.transaction(async (tx) => {
			try {
				const stripeCustomer = await stripe.customers.create({
					email: email,
					name,
				});

				const argon2id = new Argon2id();
				const hashedPassword = await argon2id.hash(password);
				const createdUser = await tx
					.insert(users)
					.values({
						id: generateId(10),
						emailVerified: false,
						hashedPassword,
						name: name,
						email: email,
						stripeCustomerId: isAdmin
							? "cus_LpSKis9bilj3rP"
							: stripeCustomer.id,
						role: "USER",
					})
					.returning();

				const insertedUser = createdUser[0];

				if (!insertedUser) {
					return tx.rollback();
				}

				return {
					id: insertedUser.id,
					name: insertedUser.name,
					email: insertedUser.email,
					stripeCustomerId: stripeCustomer.id,
					emailVerified: insertedUser.emailVerified,
					role: insertedUser.role,
				};
			} catch (err) {
				throw new UnknownError({
					message: "User not created",
					cause: err,
				});
			}
		});

		return user;
	};

	const user = await createUser();
	const token = await generateVerificationToken(user.id);
	const activationUrl = `${
		process.env.NEXT_PUBLIC_URL
	}/email-verification/${token.toString()}`;

	sendSesEmail({
		to: email,
		type: TRANSACTIONAL_EMAILS.activation,
		variables: { activationUrl },
	});

	const session = await auth.createSession(user.id, {});
	const sessionCookie = auth.createSessionCookie(session.id);

	cookies().set(sessionCookie);

	redirect("/");
}
