"use server"

import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import { z } from "zod";

import { setCookie } from "app/lib/cookies";

import { Cart } from "types";

const CreateCartSchema = z.object({
  eventDate: z.date(),
  eventTime: z.string(),
  chefId: z.string(),
})
export async function createCartMutation(input : z.infer<typeof CreateCartSchema>) {
  CreateCartSchema.parse(input)
  const cookieStore = cookies()
  const cartCookie = cookieStore.get('cart')

  if (cartCookie) {
    const cart = JSON.parse(cartCookie.value) as Cart

    cart.eventDate = input.eventDate;
    cart.eventTime = input.eventTime;

    setCookie('cart', JSON.stringify(cart))

    redirect(`/chefs/${input.chefId}/checkout`)
  } else {
    throw new Error('Failed to create cart.')
  }
}