import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetDish = z
  .object({
    description: z.string(),
    name: z.string(),
    price: z.string(),
    sectionId: z.number(),
    selectedDishId: z.number(),
  })

export default async function destroyDish(
  input: z.infer<typeof GetDish>,
  ctx: Ctx
) {
  // Validate input - very important for security
  const data = GetDish.parse(input)

  const userId = ctx.session.userId
  ctx.session.$authorize()

  if (!userId) {
    throw new Error("User not found")
  }

  const chef = await db.chef.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
    }
  })

  if (!chef) {
    throw new Error("User not found")
  }

  const dish = await db.dish.update({
    where: {
      id: data.selectedDishId,
    },
    data: {
      description: data.description,
      name: data.name,
      price: data.price,
      chefId: chef.id,
    }
  })

  return dish
}