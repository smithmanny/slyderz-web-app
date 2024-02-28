"use server";

import { cookies } from "next/headers";
import { Cart } from "types";

export async function getCartCookie() {
	const cookieStore = cookies();
	const cartCookie = cookieStore.get("cart");

	if (cartCookie) {
		return JSON.parse(cartCookie.value) as Cart;
	}

	return {
		items: [],
		subtotal: "0",
		serviceFee: "0",
		total: "0",
	} as Cart;
}

export async function setCartCookie(value: string) {
	const cookieStore = cookies();

	return cookieStore.set("cart", value, {
		maxAge: 60 * 60 * 24 * 7, // One week
		secure: process.env.NODE_ENV !== "development",
		httpOnly: true,
	});
}

export async function setCookie(name: string, value: string) {
	const cookieStore = cookies();

	return cookieStore.set(name, value, {
		maxAge: 60 * 60 * 24 * 7, // One week
		secure: process.env.NODE_ENV !== "development",
		httpOnly: true,
	});
}
