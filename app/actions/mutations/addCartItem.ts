"use server"

import { cookies } from "next/headers";
import { z } from "zod";

import { setCookie } from "app/lib/cookies";

import { Cart, CartItem } from "types";

const AddItemToCartProps = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  dishId: z.string(),
  chefId: z.string(),
})
export async function addItemToCart(input : z.infer<typeof AddItemToCartProps>) {
  const values = AddItemToCartProps.parse(input)
  const cookieStore = cookies()
  const cartCookie = cookieStore.get('cart')

  if (cartCookie) {
    const cart = JSON.parse(cartCookie.value) as Cart

    let sum = values.price * values.quantity;
    if (cart.items.length !== 0) {
      sum += cart.items.reduce((total, currentVal: CartItem) => {
        return (total += currentVal.quantity * currentVal.price);
      }, 0);
    }

    cart.total = sum;
    cart.items = [...cart.items, input];

    setCookie('cart', JSON.stringify(cart))

    return cart;
  } else {
    throw new Error('Failed to add item to cart.')
  }
}