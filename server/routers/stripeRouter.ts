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
});

export default accountRouter