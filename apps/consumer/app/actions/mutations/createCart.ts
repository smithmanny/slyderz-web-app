"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getSession } from "app/lib/auth";
import { setCartCookie } from "app/lib/cookies";
import { UnknownError } from "app/lib/errors";
import { db } from "drizzle";
import { cart } from "drizzle/schema/order";

type UserCartType = {
	eventDate: Date;
	eventTime: string;
};
async function createSessionCart(cartId: string, userCart: UserCartType) {
	try {
		await db
			.update(cart)
			.set({
				eventDate: userCart.eventDate.toISOString(),
				eventTime: userCart.eventTime,
			})
			.where(eq(cart.id, cartId));
	} catch (err: any) {
		throw new UnknownError({
			message: "Failed to create user cart",
			cause: err,
		});
	}

	const initialUserCart = {
		items: [],
		total: 0,
	};

	setCartCookie(JSON.stringify(initialUserCart));
}

const CreateCartSchema = z.object({
	eventDate: z.date(),
	eventTime: z.string(),
	chefId: z.string(),
	cartId: z.string().optional(),
});
export async function createCartMutation(
	input: z.infer<typeof CreateCartSchema>,
) {
	const cart = CreateCartSchema.parse(input);
	const { session } = await getSession();

	if (session && cart.cartId) {
		await createSessionCart(cart.cartId, {
			eventDate: cart.eventDate,
			eventTime: cart.eventTime,
		});
	} else {
		return {
			error: true,
			message: "Please log in",
		};
	}

	redirect(`/chefs/${cart.chefId}/checkout`);
}
