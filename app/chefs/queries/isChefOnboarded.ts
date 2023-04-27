import { Ctx } from "blitz";
import db from "db";
import * as z from "zod";

export default async function fetchChefDishes(input: z.infer<any>, ctx: Ctx) {
  const userId = ctx.session.userId;

  if (!userId) {
    return false;
  }

  const nearbyChefs = await db.chef.findFirst({
    where: { userId: userId },
    select: {
      isOnboardingComplete: true,
    },
  });

  if (!nearbyChefs) {
    return false;
  }

  if (nearbyChefs.isOnboardingComplete) {
    return true;
  } else {
    return false;
  }
}
