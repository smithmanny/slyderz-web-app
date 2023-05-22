import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

const GetChefData = z.object({
  chefId: z.string(),
});

export default async function chefDishesQuery(input: z.infer<any>, ctx: Ctx) {
  const data = GetChefData.parse(input);

  const chef = await db.chef.findFirstOrThrow({
    where: {
      id: data.chefId
    },
    select: {
      dishes: true,
      hours: true,
      user: {
        select: {
          name: true,
        }
      }
    },
  })

  return chef
}
