import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

const GetChefData = z.object({
  chefId: z.number(),
});

export default async function fetchChefData(input: z.infer<any>, ctx: Ctx) {
  const data = GetChefData.parse(input);

  const chef = await db.chef.findFirstOrThrow({
    where: {
      id: data.chefId
    },
    select: {
      dishes: true,
      hours: true,
    },
  })

  return chef
}
