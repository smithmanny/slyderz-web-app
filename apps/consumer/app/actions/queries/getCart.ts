"use server"

import { generateId } from "lucia";
import { cookies } from "next/headers";

import { getSession } from "app/lib/auth"
import { NotFoundError } from "app/lib/errors"
import { db } from "drizzle"

import { Cart } from "types";

function getAnonCart() {
  const cookieStore = cookies();
	const cartCookie = cookieStore.get("cart");
  const id = generateId(10)

	if (cartCookie) {
		return JSON.parse(cartCookie.value) as Cart;
	}

	return {
    id,
		items: [],
		subtotal: 0,
		serviceFee: 0,
		total: 0,
	} as Cart;
}

async function getUserCart(userId: string) {
  const cart = await db.query.cart.findFirst({
    where: (cart, { eq }) => eq(cart.userId, userId),
    with: {
      items: true
    }
  })

  if (!cart) {
    throw new NotFoundError({
      message: "Cart not found"
    })
  }

  const items = cart.items.map(item => ({
		...item,
		price: Number(item.price),
	}))

  return {
    id: cart.id,
		items,
    eventDate: cart.eventDate,
    eventTime: cart.eventTime,
		subtotal: Number(cart.subtotal),
		serviceFee: Number(cart.serviceFee),
		total: Number(cart.total),
	} as Cart;
}

export async function getCartQuery() {
  const { user } = await getSession()

  if (!user) {
    return getAnonCart()
  }

  return await getUserCart(user.id)
}