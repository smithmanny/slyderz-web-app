import { TRPCError } from "@trpc/server";
import { router, adminProcedure } from "../trpc";
import { ConvertUserToChefManually } from "app/beta/validations";

const adminRouter = router({
  fetchAllCustomers: adminProcedure.query(async (opts) => {
    try {
      const allCustomers = await opts.ctx.prisma.authUser.findMany({
        where: {
          NOT: [
            {role: {equals: "CHEF"}},
            {role: {equals: "ADMIN"}}
          ]
        },
      });

      return allCustomers;
    } catch (err) {
      console.log(err);
    }
  }),
  createChefManually: adminProcedure
  .input(ConvertUserToChefManually)
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.authUser.findFirstOrThrow({
      where: { id: input.userId },
      select: {
        id: true,
        email: true,
      },
    });

    // Create a stripe account and save id to chef
    const stripeAccount = await ctx.stripe.accounts.create({
      type: "express",
      country: "US",
      email: user.email,
      default_currency: "USD",
    });

    const chef = ctx.prisma.chef.create({
      data: {
        stripeAccountId: stripeAccount.id,
        userId: user.id,
      },
    });

    const createAccountLink = ctx.stripe.accountLinks.create({
      account: stripeAccount.id,
      refresh_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/reauth`,
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      type: "account_onboarding",
    });

    try {
      const [_, accountLink] = await Promise.all([chef, createAccountLink]);

      return accountLink.url;
    } catch (err) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Chef not created",
        cause: err,
      });
    }
  }),
});

export default adminRouter;
