import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

const GetDish = z.object({
  id: z.number(),
});

export default async function destroyDish(
  input: z.infer<typeof GetDish>,
  ctx: Ctx
) {
  const data = GetDish.parse(input);

  ctx.session.$authorize("CHEF");

  const dish = await db.dish.delete({
    where: {
      id: data.id,
    },
  });

  return dish;
}
