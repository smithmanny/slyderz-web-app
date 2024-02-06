"use server";

import { cookies } from "next/headers";
import { z } from "zod";

import { setCookie } from "app/lib/cookies";

import { Cart, CartItem } from "types";

const IncreaseCartItemQuantitySchema = z.object({
	id: z.string(),
	quantity: z.number(),
});
export async function increaseCartItemQuantityMutation(
	input: z.infer<typeof IncreaseCartItemQuantitySchema>,
) {
	IncreaseCartItemQuantitySchema.parse(input);

	const cookieStore = cookies();
	const cartCookie = cookieStore.get("cart");

	if (cartCookie) {
		const cart = JSON.parse(cartCookie.value) as Cart;
		const index = cart.items.findIndex((elem) => elem.id === input.id);
		const item = cart.items[index];

		if (!item) {
			throw new Error("Item not found");
		}

		item.quantity += 1;

		const total = cart.items.reduce(
			(itemTotal: number, currentVal: CartItem) => {
				return (itemTotal += currentVal.quantity * currentVal.price);
			},
			0,
		);

		cart.total = total;

		setCookie("cart", JSON.stringify(cart));

		return cart;
	}

	throw new Error("Failed to update dish quantity.");
}
