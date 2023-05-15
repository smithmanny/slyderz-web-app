import { Ctx, AuthorizationError } from "blitz";
import db, { Dish } from "db";
import * as z from "zod";

const GetMenuSection = z.object({
  sectionId: z.number(),
});

export default async function menuSectionQuery(
  input: z.infer<any>,
  ctx: Ctx
) {
  const data = GetMenuSection.parse(input);
  const userId = ctx.session.userId;
  ctx.session.$authorize("CHEF");

  if (!userId) {
    throw new AuthorizationError();
  }

  let dishes: Array<Dish> = []

  try {
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

    if (query?.dishes) {
      dishes = query.dishes
    }
  } catch(err) {
    console.log(err)
  }

  return dishes
}
