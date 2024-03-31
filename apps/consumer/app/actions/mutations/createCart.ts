"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getSession } from "app/lib/auth";
import { setCartCookie } from "app/lib/cookies";
import { db } from "drizzle";
import { cart } from "drizzle/schema/order";

import { UnknownError } from "app/lib/errors";
import { Cart } from "types";

type UserCartType = {
	eventDate: Date,
	eventTime: string
}
function createCookieCart(userCart: UserCartType) {
	const cookieStore = cookies();
	const cartCookie = cookieStore.get("cart");

	if (cartCookie) {
		const cart = JSON.parse(cartCookie.value) as Cart;

		cart.eventDate = userCart.eventDate.toISOString();
		cart.eventTime = userCart.eventTime;

		setCartCookie(JSON.stringify(cart));
	} else {
		throw new Error("Failed to create cart.");
	}
}

async function createSessionCart(cartId: string, userCart: UserCartType) {
	try {
		await db.update(cart).set({
			eventDate: userCart.eventDate.toISOString(),
			eventTime: userCart.eventTime
		})
		.where(eq(cart.id, cartId))
	} catch(err: any) {
		throw new UnknownError({
			message: "Failed to create user cart",
			cause: err
		})
	}
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
	const { user } = await getSession()

	if (user && cart.cartId) {
		await createSessionCart(cart.cartId, {
			eventDate: cart.eventDate,
			eventTime: cart.eventTime,
		})
	} else {
		createCookieCart({
			eventDate: cart.eventDate,
			eventTime: cart.eventTime,
		})
	}

	redirect(`/chefs/${cart.chefId}/checkout`);
}
