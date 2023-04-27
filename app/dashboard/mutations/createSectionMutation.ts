import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

const GetSection = z.object({
  name: z.string(),
});

export default async function createSection(
  input: z.infer<typeof GetSection>,
  ctx: Ctx
) {
  const data = GetSection.parse(input);

  const userId = ctx.session.userId;
  ctx.session.$authorize("CHEF");

  if (!userId) {
    throw new Error("User not found");
  }

  const chef = await db.chef.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!chef) {
    throw new Error("Chef not found");
  }

  const section = await db.section.create({
    data: {
      name: data.name,
      chefId: chef.id,
    },
  });

  return section;
}
