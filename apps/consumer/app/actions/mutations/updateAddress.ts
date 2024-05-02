"use server";

import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getProtectedSession } from "app/lib/auth";
import { db } from "drizzle";
import { address } from "drizzle/schema/user";

const stateEnum = address.state.enumValues;

const updateAddressSchema = z.object({
	address1: z.string(),
	address2: z.string().optional(),
	city: z.string(),
	state: z.enum(stateEnum),
	zipcode: z.string().transform((val) => Number(val)),
});
export async function updateAccountAddressMutation(input: FormData) {
	const { user } = await getProtectedSession();
	const data = updateAddressSchema.parse(Object.fromEntries(input.entries()));

	try {
		await db
			.insert(address)
			.values({
				id: generateId(10),
				userId: user.id,
				...data,
			})
			.onConflictDoUpdate({
				set: {
					...data,
					updatedAt: new Date().toISOString(),
				},
				target: [address.userId],
			});
	} catch (err) {
		return {
			error: true,
			message: "Error updating address",
		};
	}

	revalidatePath("/account");

	return {
		message: "Successfully updated address",
	};
}

export async function updateCheckoutAddressMutation(
	input: FormData,
	chefId: string,
) {
	const { user } = await getProtectedSession();
	const validatedFields = updateAddressSchema.safeParse(
		Object.fromEntries(input.entries()),
	);

	if (!validatedFields.success) {
		return {
			error: true,
			message: "Address not valid",
		};
	}

	try {
		await db
			.insert(address)
			.values({
				id: generateId(10),
				userId: user.id,
				...validatedFields.data,
			})
			.onConflictDoUpdate({
				set: {
					...validatedFields.data,
					updatedAt: new Date().toISOString(),
				},
				target: [address.userId],
			});
	} catch (err) {
		return {
			error: true,
			message: "Error updating address",
		};
	}

	revalidatePath(`/chefs/${chefId}/checkout`, "page");

	return {
		message: "Successfully updated address",
	};
}
