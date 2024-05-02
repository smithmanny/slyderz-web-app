"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { z } from "zod";

import { getSession } from "app/lib/auth";
import { setCartCookie } from "app/lib/cookies";
import { NotFoundError } from "app/lib/errors";
import { getConsumerCartTotal, getConsumerServiceFee } from "app/lib/utils";
import { db } from "drizzle";
import { cart, cartItems } from "drizzle/schema/order";

import type { Cart, CartItem } from "types";

const AddItemToCartProps = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	quantity: z.number(),
	dishId: z.string(),
	chefId: z.string(),
	imageUrl: z.string(),
});

function calculateCartSum(
	items: Array<CartItem>,
	{ price, quantity }: { price: number; quantity: number },
) {
	let subtotal = price * quantity;

	if (items.length !== 0) {
		subtotal += items.reduce((total, currentVal: CartItem) => {
			return (total += currentVal.quantity * currentVal.price);
		}, 0);
	}

	return subtotal;
}

function addItemToCartCookie(values: z.infer<typeof AddItemToCartProps>) {
	const cookieStore = cookies();
	const cartCookie = cookieStore.get("cart");

	if (cartCookie) {
		const cart = JSON.parse(cartCookie.value) as Cart;
		const subtotal = calculateCartSum(cart.items, {
			price: values.price,
			quantity: values.quantity,
		});
		const serviceFee = getConsumerServiceFee(subtotal);
		const total = getConsumerCartTotal(subtotal);

		cart.subtotal = subtotal;
		cart.total = total;
		cart.serviceFee = serviceFee;
		cart.items = [...cart.items, values];

		setCartCookie(JSON.stringify(cart));

		return cart;
	}

	throw new Error("Failed to add item to cart.");
}

async function addItemToCartSession(
	userId: string,
	input: z.infer<typeof AddItemToCartProps>,
) {
	const sessionCart = await db.query.cart.findFirst({
		where: (cart, { eq }) => eq(cart.userId, userId),
		with: {
			items: true,
		},
	});

	if (!sessionCart) {
		throw new NotFoundError({
			message: "Cart not found",
		});
	}

	const sessionItems = sessionCart.items.map((item) => ({
		...item,
		price: Number(item.price),
	}));
	const items = [...sessionItems];

	const subtotal = calculateCartSum(items, {
		price: input.price,
		quantity: input.quantity,
	});
	const serviceFee = getConsumerServiceFee(subtotal);
	const total = getConsumerCartTotal(subtotal);

	const userCartResp = await db
		.update(cart)
		.set({
			subtotal: subtotal.toString(),
			serviceFee: serviceFee.toString(),
			total: total.toString(),
		})
		.where(eq(cart.userId, userId))
		.returning({ id: cart.id });

	const userCart = userCartResp[0];

	if (!userCart) {
		throw new NotFoundError({
			message: "Cart not found",
		});
	}

	// Set cart item on cart
	await db.insert(cartItems).values({
		...input,
		price: input.price.toString(),
		cartId: userCart.id,
	});

	const headersList = headers();
	const path = headersList.get("referer")?.split("/chefs/");
	const chefId = path?.at(-1);

	revalidatePath(`/chefs/${chefId}`, "page");
}

export async function addItemToCart(input: z.infer<typeof AddItemToCartProps>) {
	const cartInput = AddItemToCartProps.parse(input);
	const { session, user } = await getSession();

	if (session && user) {
		await addItemToCartSession(user.id, cartInput);
	} else {
		addItemToCartCookie(cartInput);
	}

	return {
		message: "Successfully added item to cart",
	};
}
