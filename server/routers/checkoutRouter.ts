import randomstring from "randomstring";

import { router, protectedProcedure } from '../trpc';
import { setCookie } from 'server/utils/cookieHelpers';

import { readableDate } from "app/utils/dateHelpers";
import sendSesEmail from "emails/utils/sendSesEmail";
import { CreateCartType } from 'app/checkout/validations';
import {
  TRANSACTIONAL_EMAILS,
  CHEF_SERVICE_FEE,
  CONSUMER_SERVICE_FEE,
} from "types";

const checkoutRouter = router({
  createCheckout: protectedProcedure
    .input(CreateCartType)
    .mutation(async ({ ctx, input }) => {
      const { address, eventDate, eventTime, paymentMethodId } = input;
      let order;

      await ctx.prisma.$transaction(async (db) => {
        if (!ctx.session.cart || ctx.session.cart.items.length === 0) {
          throw new Error("Cart can't be empty");
        }

        if (ctx.session.user.stripeCustomerId === undefined || !paymentMethodId) {
          throw Error("Wrong order data");
        }

        // Create order
        const confirmationNumber = `SLY-${randomstring.generate({
          charset: "alphanumeric",
          capitalization: "uppercase",
          length: 7,
        })}`;

        order = await db.order.create({
          data: {
            amount: Number(ctx.session.cart?.total),
            chefId: ctx.session.cart.items[0].chefId,
            confirmationNumber,
            address1: address.address1,
            address2: address.address2,
            state: address.state,
            city: address.city,
            zipcode: address.zipcode,
            eventDate,
            eventTime,
            items: {
              createMany: {
                data: ctx.session.cart.items.map((item) => ({
                  dishId: item.dishId,
                  chefId: item.chefId,
                  quantity: item.quantity,
                })),
              },
            },
            paymentMethodId,
            userId: ctx.session.userId,
          },
          select: {
            amount: true,
            items: true,
            confirmationNumber: true,
            id: true,
            address1: true,
            address2: true,
            state: true,
            city: true,
            zipcode: true,
            chef: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
            user: {
              select: {
                email: true,
              },
            },
          },
        });

        // Send email
        if (order && order.confirmationNumber) {
          const date = new Date(eventDate);
          const acceptUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/confirm`;
          const denyUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/deny`;
          const consumerServiceFee = order.amount * CONSUMER_SERVICE_FEE;
          const chefServiceFee = order.amount * CHEF_SERVICE_FEE;
          const address = `${order.address1} ${order.city}, ${order.state} ${order.zipcode}`
          const customerEmailParams = {
              to: "contact@slyderz.co", //TODO: swap out with customer email
              type: TRANSACTIONAL_EMAILS.newOrderConsumer,
              variables: {
                orderNumber: order.confirmationNumber,
                orderDate: readableDate(date),
                orderTime: eventTime,
                orderLocation: address,
                orderSubtotal: order.amount,
                orderServiceFee: consumerServiceFee,
                orderTotal: order.amount + consumerServiceFee,
                // orderItems: order.dishes,
              },
            }
          const chefEmailParams = {
              to: "contact@slyderz.co", //TODO: swap out with chef email
              type: TRANSACTIONAL_EMAILS.newOrderChef,
              variables: {
                orderApproveUrl: acceptUrl,
                orderDenyUrl: denyUrl,
                orderNumber: order.confirmationNumber,
                orderDate: readableDate(date),
                orderTime: eventTime,
                orderLocation: address,
                orderSubtotal: order.amount,
                orderServiceFee: chefServiceFee,
                orderTotal: order.amount + chefServiceFee,
                // orderItems: order.dishes,
              },
            }

          Promise.all([sendSesEmail(customerEmailParams), sendSesEmail(chefEmailParams)])
          .then(() => console.log('Order confirmation email sent'))
          .catch((err) => console.log("Order confirmation email failed to send", err))

          const initialUserCart = {
            items: [],
            total: 0
          }
          setCookie("cart", initialUserCart, { req: ctx.req, res: ctx.res })
        }
      });

      return order;
    }),
});

export default checkoutRouter