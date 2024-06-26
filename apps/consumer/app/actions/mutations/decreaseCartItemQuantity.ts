"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { z } from "zod";

import { getSession } from "app/lib/auth";
import { setCartCookie } from "app/lib/cookies";
import { getConsumerCartTotal, getConsumerServiceFee } from "app/lib/utils";
import { db } from "drizzle";
import { cart, cartItems } from "drizzle/schema/order";

import type { Cart, CartItem } from "types";

function decreaseAnonItem(id: string) {
	const cookieStore = cookies();
	const cartCookie = cookieStore.get("cart");

	if (cartCookie) {
		const cart = JSON.parse(cartCookie.value) as Cart;
		const index = cart.items.findIndex((elem) => elem.id === id);
		const item = cart.items[index];

		if (!item) {
			throw new Error("Item not found");
		}

		if (item.quantity === 1) {
			return cart;
		}

		item.quantity -= 1;

		const subtotal = cart.items.reduce(
			(itemTotal: number, currentVal: CartItem) => {
				return (itemTotal += currentVal.quantity * currentVal.price);
			},
			0,
		);
		const serviceFee = getConsumerServiceFee(subtotal);
		const total = getConsumerCartTotal(subtotal);

		cart.subtotal = subtotal;
		cart.serviceFee = serviceFee;
		cart.total = total;

		setCartCookie(JSON.stringify(cart));

		return cart;
	}

	throw new Error("Failed to decrease item quantity.");
}

async function decreaseSessionItem(
	cartId: string,
	{ id, quantity }: { id: string; quantity: number },
) {
	if (quantity === 1) return;

	await db.transaction(async (tx) => {
		await tx
			.update(cartItems)
			.set({
				quantity: (quantity -= 1),
			})
			.where(eq(cartItems.id, id));

		const sessionItems = await tx.query.cartItems.findMany({
			where: (cartItems, { eq }) => eq(cartItems.cartId, cartId),
		});
		const items = sessionItems.map((item) => ({
			...item,
			price: Number(item.price),
		}));

		const subtotal = items.reduce((itemTotal: number, currentVal: CartItem) => {
			return (itemTotal += currentVal.quantity * currentVal.price);
		}, 0);
		const serviceFee = getConsumerServiceFee(subtotal);
		const total = getConsumerCartTotal(subtotal);

		await tx.update(cart).set({
			subtotal: subtotal.toString(),
			serviceFee: serviceFee.toString(),
			total: total.toString(),
		});

		const headersList = headers();
		const path = headersList.get("referer")?.split("/chefs/");
		const chefId = path?.at(-1);

		revalidatePath(`/chefs/${chefId}`, "page");
	});
}

const DecreaseCartItemQuantitySchema = z.object({
	id: z.string(),
	cartId: z.string(),
	quantity: z.number(),
});
export async function decreaseCartItemQuantityMutation(
	input: z.infer<typeof DecreaseCartItemQuantitySchema>,
) {
	const item = DecreaseCartItemQuantitySchema.parse(input);
	const { session } = await getSession();

	if (!session) {
		decreaseAnonItem(item.id);
	} else {
		await decreaseSessionItem(item.cartId, item);
	}

	return {
		message: "Successfully decreased item quantity",
	};
}
