import { TRPCError } from "@trpc/server";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { GetChefDishesType } from "app/chefs/validations";

const chefRouter = router({
  fetchNearbyChefs: publicProcedure.query(async (opts) => {
    try {
      const nearbyChefs = await opts.ctx.prisma.chef.findMany({
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      return nearbyChefs;
    } catch (err) {
      console.log(err);
    }
  }),
  createChef: protectedProcedure.mutation(async ({ ctx, input }) => {
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

    if (user.chef?.stripeAccountId)
      throw new TRPCError({
        code: "CONFLICT",
        message: "Chef already created for this account",
      });

    // Create a stripe account and save id to chef
    const stripeAccount = await ctx.stripe.accounts.create({
      type: "express",
      country: "US",
      email: user.email,
      default_currency: "USD",
    });

    const chef = await ctx.prisma.chef.create({
      data: {
        stripeAccountId: stripeAccount.id,
        userId: user.id,
      },
    });

    const createAccountLink = await ctx.stripe.accountLinks.create({
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
  fetchChefPublicProfile: publicProcedure
    .input(GetChefDishesType)
    .query(async ({ ctx, input }) => {
      try {
        const chef = await ctx.prisma.chef.findFirstOrThrow({
          where: {
            id: input,
          },
          select: {
            dishes: {
              include: {
                image: true
              }
            },
            hours: {
              select: {
                daysOfWeek: true,
                endTime: true,
                startTime: true,
              },
            },
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        });

        return {
          dishes: chef.dishes,
          chefName: chef.user.name,
          chefImage: chef.user.image?.imageUrl,
          hours: chef.hours,
        };
      } catch (err) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chef not found",
          cause: err,
        });
      }
    }),
});

export default chefRouter;
