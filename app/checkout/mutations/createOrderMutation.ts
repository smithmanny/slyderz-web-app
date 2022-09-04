import { Ctx } from "blitz";
import randomstring from "randomstring";

import { readableDate } from "app/helpers/dateHelpers"
import { sendOrderRequestEmail } from "app/utils/send-email"
import db from "db"
import { EmailBodyType } from 'types'

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
        confirmationNumber: true,
        id: true,
        user: {
          select: {
            email: true
          }
        }
      },
    })

    // Send email
    if (order) {
      const date = new Date(eventDate)
      const acceptUrl = new URL(`${process.env.URL}/orders/${order.confirmationNumber}/confirm`)
      const denyUrl = new URL(`${process.env.URL}/orders/${order.confirmationNumber}/deny`)

      const emailData: EmailBodyType = {
        acceptOrderUrl: acceptUrl,
        denyOrderUrl: denyUrl,
        cartItems: ctx.session.cart.pendingCartItems,
        email: order.user.email,
        orderTotal: ctx.session.cart.total,
        confirmationNumber: order.confirmationNumber,
        eventTime,
        eventDate: readableDate(date),
      }

      sendOrderRequestEmail(emailData).catch(e => {
        console.log(e)
        throw new Error('Failed sending email', e)
      })
    }

    // reset cart & total
    await ctx.session.$setPublicData({
      cart: {
        pendingCartItems: [],
        total: 0,
      }
    })
  })

  return order
}