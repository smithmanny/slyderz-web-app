import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

const GetChefDishes = z.object({
  chefId: z.number(),
});

export default async function fetchChefDishes(input: z.infer<any>, ctx: Ctx) {
  const data = GetChefDishes.parse(input);

  const dishes = await db.dish.findMany({
    where: { id: data.chefId },
    include: {
      chef: {
        include: {
          hours: true,
        },
      },
      section: {
        select: {
          id: true,
        },
      },
    },
  });

  return dishes;
}
