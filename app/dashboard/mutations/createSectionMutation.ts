import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetSection = z
  .object({
    name: z.string(),
  })

export default async function createSection(
  input: z.infer<typeof GetSection>,
  ctx: Ctx
) {
  // Validate input - very important for security
  const data = GetSection.parse(input)

  const userId = ctx.session.userId
  ctx.session.$authorize()

  if (!userId) {
    throw new Error("Can't find user")
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
    throw new Error("Can't find user")
  }

  const section = await db.section.create({
    data: {
      name: data.name,
      chefId: chef.id
    }
  })

  return section
}