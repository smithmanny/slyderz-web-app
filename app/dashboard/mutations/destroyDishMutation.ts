import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetDish = z
  .object({
    id: z.number(),
  })

export default async function destroyDish(
  input: z.infer<typeof GetDish>,
  ctx: Ctx
) {
  // Validate input - very important for security
  const data = GetDish.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const dish = await db.dish.delete({
    where: {
      id: data.id,
    }
  })

  return dish
}