import { Ctx } from "blitz";
import randomstring from "randomstring";

import { readableDate } from "app/utils/dateHelpers"
import sendSesEmail from "emails/utils/sendSesEmail";
import db from "db"
import { TRANSACTIONAL_EMAILS } from 'types'

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

      try {
        await sendSesEmail({
          to: 'contact@slyderz.co',
          type: TRANSACTIONAL_EMAILS.newOrderConsumer,
          variables: {
            order: {
              orderNumber: order.confirmationNumber,
              date: readableDate(date),
              time: eventTime,
              location: "",
              subtotal: order.amount,
              serviceFee: 3,
              total: order.amount + 3,
              items: ctx.session.cart.pendingCartItems
            }
          }
        })
        await sendSesEmail({
          to: 'contact@slyderz.co',
          type: TRANSACTIONAL_EMAILS.newOrderChef,
          variables: {
            order: {
              approveUrl: acceptUrl,
              denyUrl: denyUrl,
              orderNumber: order.confirmationNumber,
              date: readableDate(date),
              time: eventTime,
              location: "",
              subtotal: order.amount,
              serviceFee: 3,
              total: order.amount + 3,
              items: ctx.session.cart.pendingCartItems
            }
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