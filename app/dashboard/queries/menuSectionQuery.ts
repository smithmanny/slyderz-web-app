import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

const GetMenuSection = z.object({
  sectionId: z.number(),
});

export default async function getChefMenuSections(
  input: z.infer<any>,
  ctx: Ctx
) {
  const data = GetMenuSection.parse(input);

  // Require user to be logged in
  const userId = ctx.session.userId;
  ctx.session.$authorize("CHEF");

  if (!userId) {
    throw new Error("User not found");
  }

  const query = await db.chef.findFirst({
    where: { userId },
    select: {
      dishes: {
        where: {
          sectionId: data.sectionId,
        },
      },
    },
  });

  return query?.dishes;
}
