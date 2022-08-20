import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetHour = z
  .object({
    id: z.number(),
  })

export default async function updateHoursMutation(
  input: z.infer<typeof GetHour>,
  ctx: Ctx
) {
  const data = GetHour.parse(input)

  const userId = ctx.session.userId
  ctx.session.$authorize()

  if (!userId) {
    throw new Error("Can't find user")
  }

  const hours = await db.hours.delete({
    where: { id: data.id },
  })

  return hours
}