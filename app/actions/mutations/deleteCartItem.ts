"use server"

import { cookies } from "next/headers";
import { z } from "zod";

import { setCookie } from "app/lib/cookies";

import { Cart, CartItem } from "types";

const DeleteCartItemSchema = z.object({
  id: z.string(),
})
export async function deleteCartItemMutation(input : z.infer<typeof DeleteCartItemSchema>) {
  DeleteCartItemSchema.parse(input)

  const cookieStore = cookies()
  const cartCookie = cookieStore.get('cart')

  if (cartCookie) {
    const cart = JSON.parse(cartCookie.value) as Cart
    const updatedCartItems: Array<CartItem> = cart.items.filter(
        (item) => item.id !== input.id
      );
    const sum = updatedCartItems.reduce((total, currentVal: CartItem) => {
      return (total += currentVal.quantity * currentVal.price);
    }, 0);

    cart.total = sum;
    cart.items = [...updatedCartItems];


    setCookie('cart', JSON.stringify(cart))

    return cart;
  } else {
    throw new Error('Failed to delete dish.')
  }
}