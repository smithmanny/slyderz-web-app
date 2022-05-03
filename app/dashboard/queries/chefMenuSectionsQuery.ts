import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

export default async function getChefMenuSections(
  input: z.infer<any>,
  ctx: Ctx
) {

  // Require user to be logged in
  const userId = ctx.session.$publicData.userId
  ctx.session.$authorize()

  if (!userId) {
    throw new Error("Can't find user")
  }

  const data = await db.chef.findFirst({
    where: { userId },
    select: {
      menu: {
        select: {
          sections: {
            select: {
              id: true,
              name: true,
              dishes: {
                select: {
                  id: true,
                  description: true,
                  name: true,
                  price: true,
                }
              }
            }
          }
        }
      }
    }
  })

  if (!data) {
    throw new Error("Can't find menu")
  }

  const sections = data.menu?.sections

  return sections
}