"use server";

import { cookies } from "next/headers";

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
