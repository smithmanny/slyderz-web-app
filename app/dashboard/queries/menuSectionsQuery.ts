import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

export default async function getChefMenuSections(
  input: z.infer<any>,
  ctx: Ctx
) {

  // Require user to be logged in
  const userId = ctx.session.userId
  ctx.session.$authorize()

  if (!userId) {
    throw new Error("Can't find user")
  }

  const query = await db.chef.findFirst({
    where: { userId },
    select: {
      sections: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })


  return query?.sections
}