import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetSection = z
  .object({
    id: z.number(),
  })

export default async function destroySection(
  input: z.infer<typeof GetSection>,
  ctx: Ctx
) {
  // Validate input - very important for security
  const data = GetSection.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const section = await db.section.delete({
    where: {
      id: data.id,
    }
  })

  return section
}