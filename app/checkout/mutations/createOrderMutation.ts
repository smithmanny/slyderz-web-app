import { Ctx } from "blitz";
import randomstring from "randomstring";

import { readableDate } from "app/utils/dateHelpers"
import sendSesEmail from "emails/utils/sendSesEmail";
import db from "db"
import { TRANSACTIONAL_EMAILS, CHEF_SERVICE_FEE, CONSUMER_SERVICE_FEE } from 'types'

export default async function CreateOrderMutation(input: any, ctx: Ctx) {
  const { eventDate, eventTime, paymentMethodId } = input;
  let order

  await db.$transaction(async (db) => {
    if (!ctx.session.cart || ctx.session.cart.pendingCartItems.length === 0) {
      throw new Error("Cart can't be empty")
    }

    if (ctx.session.stripeCustomerId === undefined || !paymentMethodId) {
      throw Error("Wrong order data")
    }

    // Create order
    const confirmationNumber = `SLY-${randomstring.generate({
      charset: 'alphanumeric',
      capitalization: 'uppercase',
      length: 7,
    })}`

    order = await db.order.create({
      data: {
        amount: Number(ctx.session.cart?.total),
        chefId: ctx.session.cart.pendingCartItems[0].chefId,
        confirmationNumber,
        eventDate,
        eventTime,
        dishes: {
          createMany: {
            data: ctx.session.cart.pendingCartItems.map(item => ({
              dishId: item.dishId,
              chefId: item.chefId,
              quantity: item.quantity,
            }))
          }
        },
        paymentMethodId,
        userId: Number(ctx.session.userId),
      },
      select: {
        amount: true,
        dishes: true,
        confirmationNumber: true,
        id: true,
        chef: {
          select: {
            user: {
              select: {
                email: true
              }
            }
          }
        },
        user: {
          select: {
            email: true
          }
        }
      },
    })

    // Send email
    if (order && order.confirmationNumber) {
      const date = new Date(eventDate)
      const acceptUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/confirm`
      const denyUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/deny`
      const consumerServiceFee = order.amount * CONSUMER_SERVICE_FEE
      const chefServiceFee = order.amount * CHEF_SERVICE_FEE

      try {
        await sendSesEmail({
          to: 'contact@slyderz.co',
          type: TRANSACTIONAL_EMAILS.newOrderConsumer,
          variables: {
            orderNumber: order.confirmationNumber,
            orderDate: readableDate(date),
            orderTime: eventTime,
            orderLocation: "",
            orderSubtotal: order.amount,
            orderServiceFee: consumerServiceFee,
            orderTotal: order.amount + consumerServiceFee,
            // orderItems: order.dishes,
          }
        })
        await sendSesEmail({
          to: 'contact@slyderz.co',
          type: TRANSACTIONAL_EMAILS.newOrderChef,
          variables: {
            orderApproveUrl: acceptUrl,
            orderDenyUrl: denyUrl,
            orderNumber: order.confirmationNumber,
            orderDate: readableDate(date),
            orderTime: eventTime,
            orderLocation: "",
            orderSubtotal: order.amount,
            orderServiceFee: chefServiceFee,
            orderTotal: order.amount + chefServiceFee,
            // orderItems: order.dishes,
          }
        })
      } catch(err) {
        console.log("Error sending email", err)
        throw new Error("Sorry, your order can't be placed right now")
      }

      // reset cart & total
      await ctx.session.$setPublicData({
        cart: {
          pendingCartItems: [],
          total: 0,
        }
      })
    }
  })

  return order
}