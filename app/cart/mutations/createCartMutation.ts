import { Ctx } from "blitz";
import * as z from "zod"

import { CreateOrder } from "../validations";

export default async function createCartMutation(
  input: z.infer<typeof CreateOrder>,
  ctx: Ctx
) {
  const data = CreateOrder.parse(input)
  const cart = ctx.session.cart

  if (cart) {
    return await ctx.session.$setPublicData({
      cart: {
        ...cart,
        eventDate: data.eventDate,
        eventTime: data.eventTime
      },
    });
  }

  throw new Error('Error with cart')
}
