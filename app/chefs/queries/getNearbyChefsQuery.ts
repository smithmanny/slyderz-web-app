import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

export default async function fetchChefDishes(input: z.infer<any>, ctx: Ctx) {
  const nearbyChefs = await db.chef.findMany({
    include: {
      user: {
        select: {
          firstName: true,
        },
      },
    },
  });

  return nearbyChefs;
}
