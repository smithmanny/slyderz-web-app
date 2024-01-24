import { TRPCError } from "@trpc/server";
import { Prisma } from ".prisma/client";

import { router, chefProcedure } from "../trpc";
import getCloudinary from "app/lib/cloudinary";

import {
  CreateSection,
  DestroyHour,
  GetChefSectionDish,
  GetChefSectionDishes,
  CreateDish,
  UpdateDish,
  DestroyDishImageType,
  DestroyDish,
  CreateHours,
  DeleteSection,
} from "app/validations/dashboardValidations";

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
          cause: err,
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
          image: true,
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
            NOT: {
              deleted: true
            }
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
        userId: ctx.session.user.userId,
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
      const dish = await ctx.prisma.dish.upsert({
        where: {
          name_chefId: {
            name: input.name,
            chefId: ctx.chef.id
          }
        },
        create: {
          description: input.description,
          name: input.name,
          price: new Prisma.Decimal(input.price),
          sectionId: input.sectionId,
          chefId: ctx.chef.id,
          image: {
            create: {
              imagePublicId: input.image.imagePublicId,
              imageUrl: input.image.imageUrl,
            }
          }
        },
        update: {
          description: input.description,
          name: input.name,
          price: new Prisma.Decimal(input.price),
          sectionId: input.sectionId,
          deleted: false,
          image: {
            create: {
              imagePublicId: input.image.imagePublicId,
              imageUrl: input.image.imageUrl,
            }
          }
        }
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
            image: {
              update: {
                where: {
                  imagePublicId: input.image.imagePublicId
                },
                data: {
                  imagePublicId: input.image.imagePublicId,
                  imageUrl: input.image.imageUrl,
                }
              }
            }
          },
        });

        return dish;
      } catch (err) {
        console.log("Failed to update Item", err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dish not updated",
          cause: err,
        });
      }
    }),
  destroyDishPicture: chefProcedure
    .input(DestroyDishImageType)
    .mutation(async ({ input, ctx }) => {
      const cloudinary = getCloudinary();

      try {
        const imageToDestroy = await ctx.prisma.dishPhoto.findFirst({
          where: {
            imagePublicId: input.publicId
          }
        })

        // This won't run for new dishes
        if (imageToDestroy) {
          await ctx.prisma.dishPhoto.delete({
            where: {
              imagePublicId: input.publicId
            },
          })
        }

        await cloudinary.uploader.destroy(input.publicId);
      } catch (err: any) {
        console.log("Error deleting cloudinary image", err.message);
        throw new Error("Error deleting cloudinary image");
      }
    }),
  destroyDish: chefProcedure
    .input(DestroyDish)
    .mutation(async ({ ctx, input }) => {
      try {
        // OrderItem model needs dish so soft delete
        await ctx.prisma.dish.update({
          where: {
            id: input.dishId,
          },
          data: {
            deleted: true
          }
        });

        return true;
      } catch (err) {
        console.log("Failed to delete Item", err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dish not destroyed",
          cause: err,
        });
      }
    }),
});

export default dashboardRouter;
