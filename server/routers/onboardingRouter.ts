import { router, chefProcedure } from "../trpc";

import { UploadHeadshotUrl } from "app/onboarding/validations";
import { AddChefDescription } from "app/onboarding/validations";

const chefRouter = router({
  completeOnboardingHeadshot: chefProcedure
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.chef.update({
          where: {
            id: ctx.chef.id
          },
          data: {
            onboardingState: "COMPLETE_SERVSAFE",
          }
        })
      } catch (err) {
        console.log(err);
      }
    }),
  completeOnboardingDescription: chefProcedure
    .input(AddChefDescription)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.chef.update({
          where: {
            id: ctx.chef.id
          },
          data: {
            description: input.description,
            isOnboardingComplete: true,
            onboardingState: 'DONE'
          }
        })
      } catch (err) {
        console.log(err);
      }
    }),
  fetchOnboardingState: chefProcedure.query(async ({ ctx }) => {
    const chef = await ctx.prisma.chef.findFirstOrThrow({
      where: {
        userId: ctx.session.userId,
      },
      select: {
        id: true,
        stripeAccountId: true,
        onboardingState: true,
      },
    });

    if (chef.onboardingState === "SETUP_STRIPE") {
      const account = await ctx.stripe.accounts.retrieve(chef.stripeAccountId);

      if (account.charges_enabled) {
        await ctx.prisma.chef.update({
          where: {
            id: chef.id,
          },
          data: {
            onboardingState: "UPLOAD_HEADSHOT",
          },
        });
      }
    }

    return chef.onboardingState;
  }),
});

export default chefRouter;
