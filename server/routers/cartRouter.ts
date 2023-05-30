import { TRPCError } from '@trpc/server';
import { hasCookie } from 'cookies-next';

import { router, publicProcedure, protectedProcedure } from '../trpc';
import { CreateCartType } from 'app/cart/validations';

const chefRouter = router({
  createCart: publicProcedure
    .input(CreateCartType)
    .mutation(async ({ ctx, input }) => {
      try {
        const cart = await ctx.prisma.cart.create({
          data: {
            total: input.total,
            eventDate: input.eventDate,
            eventTime: input.eventTime,
            chefId: input.chefId,
            userId: ctx.session.userId,
            items: {
              createMany: {
                data: {
                  ...input.items
                }
              }
            }
          },
        });

        return cart;
      } catch(err) {
        console.log(err)
      }
    }),
  getUserCart: publicProcedure
    .query(async ({ ctx }) => {
      try {
        const cart = ctx.prisma.cart.findFirst({
          where: {
            userId: ctx.session.userId
          },
          include: {
            items: true
          }
        })

        return cart
      } catch (err) {
        console.log("Failed to create cart", err.message)
      }
    })
});

export default chefRouter