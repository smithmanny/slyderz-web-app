import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

import { router, chefProcedure } from "../trpc";

import {
  CreateSection,
  DestroyHour,
  GetChefSectionDish,
  GetChefSectionDishes,
  CreateDish,
  UpdateDish,
  DestroyDish,
  CreateHours,
  DeleteSection,
} from "app/dashboard/validations";

const dashboardRouter = router({
  createSection: chefProcedure
    .input(CreateSection)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.section.create({
          data: {
            name: input.name,
            chefId: ctx.chef.id,
          },
        });

        return;
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Section not created",
        });
      }
    }),
  getChefSectionDish: chefProcedure
    .input(GetChefSectionDish)
    .query(async ({ ctx, input }) => {
      const dish = await ctx.prisma.dish.findFirstOrThrow({
        where: {
          id: input.dishId,
          sectionId: input.sectionId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          chefId: true,
          sectionId: true,
        },
      });

      return dish;
    }),
  getChefSectionDishes: chefProcedure
    .input(GetChefSectionDishes)
    .query(async ({ ctx, input }) => {
      try {
        const dishes = await ctx.prisma.dish.findMany({
          where: {
            chefId: ctx.chef.id,
            sectionId: input.sectionId,
          },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            chefId: true,
            sectionId: true,
          },
        });

        return dishes;
      } catch (err) {
        console.log(err);
      }
    }),
  getMenuSections: chefProcedure.query(async ({ ctx, input }) => {
    const sections = await ctx.prisma.section.findMany({
      where: {
        chefId: ctx.chef.id,
      },
    });

    return sections;
  }),
  destroySection: chefProcedure
    .input(DeleteSection)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.section.delete({
        where: {
          id: input.sectionId,
        },
      });

      return true;
    }),
  getChefHours: chefProcedure.query(async ({ ctx }) => {
    const chef = await ctx.prisma.chef.findFirstOrThrow({
      where: {
        userId: ctx.session.userId,
      },
    });
    const hours = await ctx.prisma.hours.findMany({
      where: {
        chefId: chef.id,
      },
    });

    if (!hours) return [];

    return hours;
  }),
  createHours: chefProcedure
    .input(CreateHours)
    .mutation(async ({ ctx, input }) => {
      const selectedWeekdays: Array<string> = [];

      const allChefHours = await ctx.prisma.hours.findMany({
        where: {
          chefId: ctx.chef.id,
        },
      });

      // create array with days of week thats already created
      allChefHours.map((hourBlock) => {
        hourBlock.daysOfWeek.map((dayOfWeek) =>
          selectedWeekdays.push(dayOfWeek)
        );
      });

      input.daysOfWeek.map((dayOfWeek) => {
        if (selectedWeekdays.includes(dayOfWeek)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `${dayOfWeek} is already being used in a time block`,
          });
        }
      });

      const hours = await ctx.prisma.hours.create({
        data: {
          chefId: ctx.chef.id,
          ...input,
        },
      });

      return hours;
    }),
  destroyHours: chefProcedure
    .input(DestroyHour)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.hours.delete({
        where: {
          id: input.hourId,
        },
      });

      return true;
    }),
  createDish: chefProcedure
    .input(CreateDish)
    .mutation(async ({ ctx, input }) => {
      const dish = await ctx.prisma.dish.create({
        data: {
          description: input.description,
          name: input.name,
          price: new Prisma.Decimal(input.price),
          sectionId: input.sectionId,
          chefId: ctx.chef.id,
        },
      });

      return dish;
    }),
  updateDish: chefProcedure
    .input(UpdateDish)
    .mutation(async ({ ctx, input }) => {
      try {
        const dish = await ctx.prisma.dish.update({
          where: {
            id: input.selectedDishId,
          },
          data: {
            description: input.description,
            name: input.name,
            price: input.price,
          },
        });

        return dish;
      } catch (err) {
        console.log("Failed to update Item", err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dish not updated",
        });
      }
    }),
  destroyDish: chefProcedure
    .input(DestroyDish)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.dish.delete({
          where: {
            id: input.dishId,
          },
        });

        return true;
      } catch (err) {
        console.log("Failed to delete Item", err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dish not destroyed",
        });
      }
    }),
});

export default dashboardRouter;