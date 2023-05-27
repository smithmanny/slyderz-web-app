import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

const accountRouter = router({
  createSetupIntent: protectedProcedure
    .query(async (opts) => {
      try {
        const setupIntent = await opts.ctx.stripe.setupIntents.create({
          customer: opts.ctx.session.user.stripeCustomerId,
          payment_method_types: ["card"],
          metadata: {
            userId: opts.ctx.session.userId,
          },
          usage: "off_session",
        })

        return setupIntent.client_secret;
      } catch(err) {
        console.log(err.message)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error..Please try again"
        })
      }
    }),
  createAccountLinkMutation: protectedProcedure
    .mutation(async ({ ctx }) => {
      const user = await ctx.prisma.authUser.findFirstOrThrow({
        where: { id: ctx.session.userId },
        select: {
          id: true,
          email: true,
          chef: {
            select: {
              stripeAccountId: true
            }
          }
        }
      })

      if (!user.chef || !user.chef.stripeAccountId) throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error..Please try again"
        })

      try {
        const accountLink = await ctx.stripe.accountLinks.create({
          account: user.chef.stripeAccountId,
          refresh_url: "http://localhost:3000/api/stripe/reauth",
          return_url: "http://localhost:3000/dashboard",
          type: "account_onboarding",
        });
        return accountLink.url
      } catch (err) {
        throw new Error(err)
      }
    })
});

export default accountRouter