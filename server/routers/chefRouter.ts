import { TRPCError } from '@trpc/server';
import { hasCookie } from 'cookies-next';

import { router, publicProcedure, protectedProcedure } from '../trpc';
import { GetChefDishesType } from 'app/chefs/validations';

const chefRouter = router({
  fetchNearbyChefs: publicProcedure
    .query(async (opts) => {
      try {
        const nearbyChefs = await opts.ctx.prisma.chef.findMany({
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        });

        return nearbyChefs;
      } catch(err) {
        console.log(err)
      }
    }),
  createChef: protectedProcedure
    .mutation(async ({ ctx, input }) => {
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

      if (user.chef?.stripeAccountId) throw new TRPCError({
        code: "CONFLICT",
        message: 'Chef already created for this account'
      })

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
          refresh_url: "http://localhost:3000/api/stripe/reauth",
          return_url: "http://localhost:3000/dashboard/onboarding",
          type: "account_onboarding",
        });

        try {
          const [_, accountLink] = await Promise.all([chef, createAccountLink]);

          return accountLink.url
        } catch (err) {
          throw new Error(err)
        }
    }),
  fetchChefDishes: publicProcedure
    .input(GetChefDishesType)
    .query(async ({ ctx, input }) => {
      const chef = await ctx.prisma.chef.findFirst({
        where: {
          id: input
        },
        select: {
          dishes: true,
          hours: true,
          user: {
            select: {
              name: true,
            }
          }
        },
      })

      return chef
    })
});

export default chefRouter