import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetDish = z.object({
  dishId: z.number(),
  sectionId: z.number(),
})

export default async function getChefMenuSections(
  input: z.infer<any>,
  ctx: Ctx
) {
  const data = GetDish.parse(input)

  // Require user to be logged in
  const userId = ctx.session.$publicData.userId
  ctx.session.$authorize()

  if (!userId) {
    throw new Error("Can't find user")
  }

  const query = await db.chef.findFirst({
    where: { userId },
    select: {
      dishes: {
        where: {
          sectionId: data.sectionId,
          id: data.dishId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          chefId: true,
          sectionId: true,
        }
      }
    }
  })

  return query?.dishes[0];
}