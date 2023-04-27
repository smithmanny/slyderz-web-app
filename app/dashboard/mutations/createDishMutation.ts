import { Ctx } from "blitz";
import { Prisma } from "@prisma/client";
import * as z from "zod";

import db from "db";

const GetDish = z.object({
  description: z.string(),
  name: z.string(),
  price: z.string(),
  sectionId: z.number(),
});

export default async function destroyDish(
  input: z.infer<typeof GetDish>,
  ctx: Ctx
) {
  const data = GetDish.parse(input);

  const userId = ctx.session.userId;

  if (!userId) {
    throw new Error("User not found");
  }

  const chef = await db.chef.findFirst({
    where: { userId },
    select: { id: true },
  });

  if (!chef) {
    throw new Error("User not found");
  }

  ctx.session.$authorize("CHEF");

  const dish = await db.dish.create({
    data: {
      description: data.description,
      name: data.name,
      price: new Prisma.Decimal(data.price),
      sectionId: data.sectionId,
      chefId: chef.id,
    },
  });

  return dish;
}
