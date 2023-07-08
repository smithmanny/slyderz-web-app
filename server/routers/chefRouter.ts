import { TRPCError } from "@trpc/server";
import { nextSunday, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday } from 'date-fns'

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { GetChefDishesType } from "app/chefs/validations";
import { convertDayToInt } from "app/utils/time";

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
            AND: {
              hours: {
                some: {
                  daysOfWeek: {
                    isEmpty: false
                  }
                }
              },
            },
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

        const getNextAvailableChefDay = () => {
          const chefWorkingDays: Array<number> = [];

          chef.hours.forEach((hourBlock) =>
            hourBlock.daysOfWeek.forEach((day) => {
              const matchedDay = convertDayToInt(day);
              chefWorkingDays.push(matchedDay);
            })
          );

          function getNextDay(day: number|undefined): Date {
            const today = new Date()
            let date: Date = today

            switch(day) {
              case 0:
                date = nextSunday(today)
                break;
              case 1:
                date = nextMonday(today)
                break;
              case 2:
                date = nextTuesday(today)
                break;
              case 3:
                date = nextWednesday(today)
                break;
              case 4:
                date = nextThursday(today)
                break;
              case 5:
                date = nextFriday(today)
                break;
              case 6:
                date = nextSaturday(today)
                break;
            }

            return date;
          }

          const sortedAvailableDays = chefWorkingDays.sort()
          const todayDay = new Date().getDay()
          const workingDayIndex = sortedAvailableDays.indexOf(todayDay)

          // If chefWorkingDays does not contain today return the next available day
          if (workingDayIndex === -1) {
            const daysAfterToday = sortedAvailableDays.filter(day => day >= todayDay)

            if (daysAfterToday.length === 0) {
              return getNextDay(sortedAvailableDays[0])
            }

            return getNextDay(daysAfterToday[0])
          }

          return getNextDay(sortedAvailableDays[workingDayIndex])
        }

        const nextAvailableChefDay = getNextAvailableChefDay()

        return {
          nextAvailableChefDay: nextAvailableChefDay,
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
