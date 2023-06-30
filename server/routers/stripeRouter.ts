import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

const accountRouter = router({
  createSetupIntent: protectedProcedure.query(async (opts) => {
    try {
      const setupIntent = await opts.ctx.stripe.setupIntents.create({
        customer: opts.ctx.session.user.stripeCustomerId,
        payment_method_types: ["card"],
        metadata: {
          userId: opts.ctx.session.userId,
        },
        usage: "off_session",
      });

      return setupIntent.client_secret;
    } catch (err) {
      console.log(err);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error..Please try again",
        cause: err,
      });
    }
  }),
  createAccountLinkMutation: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.authUser.findFirstOrThrow({
      where: { id: ctx.session.userId },
      select: {
        id: true,
        email: true,
        chef: {
          select: {
            stripeAccountId: true,
          },
        },
      },
    });

    if (!user.chef || !user.chef.stripeAccountId)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error..Please try again",
      });

    try {
      const accountLink = await ctx.stripe.accountLinks.create({
        account: user.chef.stripeAccountId,
        refresh_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/reauth`,
        return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
        type: "account_onboarding",
      });
      return accountLink.url;
    } catch (err) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error..Please try again",
        cause: err,
      });
    }
  }),
});

export default accountRouter;
