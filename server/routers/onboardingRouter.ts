import { router, protectedProcedure } from "../trpc";

import { UploadHeadshotUrl } from "app/onboarding/validations";

const chefRouter = router({
  completeOnboardingHeadshot: protectedProcedure
    .input(UploadHeadshotUrl)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.authUser.update({
          where: { id: ctx.session.userId },
          data: {
            image: input.image,
            imagePublicId: input.imagePublicId,
            chef: {
              update: {
                onboardingState: "COMPLETE_SERVSAFE",
              },
            },
          },
        });

        return;
      } catch (err) {
        console.log(err);
      }
    }),
  fetchOnboardingState: protectedProcedure.query(async ({ ctx }) => {
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
