import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetOrder = z.object({
  confirmationNumber: z.string(),
})

export default async function getOrderByConfirmation(
  input: z.infer<any>,
  ctx: Ctx
) {

  // Require user to be logged in
  const userId = ctx.session.$publicData.userId
  const data = GetOrder.parse(input)
  ctx.session.$authorize()

  if (!userId) {
    throw new Error("Can't find user")
  }

  const query = await db.order.findFirst({
    where: {
      userId,
      confirmationNumber: data.confirmationNumber,
    },
  })

  return query
}