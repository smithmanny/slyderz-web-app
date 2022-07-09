import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetChefDishes = z.object({
  chefId: z.number(),
})

export default async function fetchChefDishes(
  input: z.infer<any>,
  ctx: Ctx
) {
  const data = GetChefDishes.parse(input)
  const userId = ctx.session.$publicData.userId

  if (!userId) {
    throw new Error("Can't find user")
  }

  const dishes = await db.dish.findMany({
    where: { id: data.chefId },
  })

  return dishes;
}