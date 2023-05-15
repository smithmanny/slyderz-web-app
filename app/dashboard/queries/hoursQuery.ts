import { Ctx, AuthorizationError } from "blitz";
import db, { Hours } from "db";
import * as z from "zod";

export default async function getChefHoursQuery(input: z.infer<any>, ctx: Ctx) {
  const userId = ctx.session.userId;
  ctx.session.$authorize("CHEF");

  if (!userId) {
    throw new AuthorizationError("User not found");
  }

  let hours: Array<Hours> = []

  try {
    const query = await db.chef.findFirst({
      where: { userId },
      include: {
        hours: true,
      },
    });

    if (query?.hours) {
      hours = query?.hours;
    }
  } catch(err) {
    console.log(err)
  }

  return hours;
}
