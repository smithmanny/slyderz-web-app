import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

const GetOrder = z.object({
  confirmationNumber: z.string(),
});

export default async function getOrderByConfirmation(
  input: z.infer<any>,
  ctx: Ctx
) {
  const data = GetOrder.parse(input);

  // Require user to be logged in
  ctx.session.$authorize();
  const userId = ctx.session.userId;

  const query = await db.order.findFirst({
    where: {
      userId,
      confirmationNumber: data.confirmationNumber,
    },
  });

  return query;
}
