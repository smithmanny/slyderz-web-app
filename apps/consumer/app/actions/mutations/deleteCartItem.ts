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
import { cartItems } from "drizzle/schema/order";

import { Cart, CartItem } from "types";

function deleteAnonItem(itemId: string) {
	const cookieStore = cookies();
	const cartCookie = cookieStore.get("cart");

	if (cartCookie) {
		const cart = JSON.parse(cartCookie.value) as Cart;
		const updatedCartItems: Array<CartItem> = cart.items.filter(
			(item) => item.id !== itemId,
		);
		const subtotal = updatedCartItems.reduce((total, currentVal: CartItem) => {
			return (total += currentVal.quantity * currentVal.price);
		}, 0);

		const serviceFee = getConsumerServiceFee(subtotal);
		const total = getConsumerCartTotal(subtotal);

		cart.subtotal = subtotal;
		cart.serviceFee = serviceFee;
		cart.total = total;
		cart.items = [...updatedCartItems];

		setCartCookie(JSON.stringify(cart));
	}

	return {
		error: "Failed to delete dish.",
	};
}

async function deleteSessionItem(itemId: string) {
	const headersList = headers();
	const path = headersList.get("referer")?.split("/chefs/");
	const chefId = path?.at(-1);

	try {
		await db.delete(cartItems).where(eq(cartItems.id, itemId));
	} catch (err: any) {
		return {
			error: `Error deleting cart item ${err.message}`,
		};
	}

	revalidatePath(`/chefs/${chefId}`, "page");
}

const DeleteCartItemSchema = z.object({
	id: z.string(),
});
export async function deleteCartItemMutation(
	input: z.infer<typeof DeleteCartItemSchema>,
) {
	const cartItem = DeleteCartItemSchema.parse(input);

	const { session } = await getSession();

	if (session) {
		await deleteSessionItem(cartItem.id);
	} else {
		deleteAnonItem(cartItem.id);
	}

	return {
		message: "Successfully deleted cart item",
	};
}
