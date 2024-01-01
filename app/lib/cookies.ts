'use server'

import { cookies } from 'next/headers'
import { Cart } from "types";

export function getCartCookie() {
  const cookieStore = cookies()
  const cartCookie = cookieStore.get("cart");
  const initialUserCart: Cart = {
    items: [],
    total: 0,
  };

  if (!cartCookie) {
    cookieStore.set({
      name: "cart",
      value: JSON.stringify(initialUserCart),
      maxAge: 60 * 6 * 24,
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
    });
    return initialUserCart;
  } else {
    const userCart: Cart = JSON.parse(String(cartCookie));

    return {
      items: userCart.items,
      total: userCart.total,
    };
  }
}