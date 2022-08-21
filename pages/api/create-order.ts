import { api } from "app/blitz-server";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@blitzjs/auth";
import randomstring from "randomstring";

import { siteUrl } from "app/helpers/site";
import { readableDate } from "app/helpers/dateHelpers"
import { sendOrderRequestEmail } from "app/helpers"
import db from "db"
import { EmailBodyType } from 'types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res)
  const { eventDate, eventTime, paymentMethodId } = req.body;

  if (!session.cart) {
    throw new Error("Cart can't be empty")
  }

  if (session.stripeCustomerId === undefined || !paymentMethodId) {
    throw Error("Wrong order data")
  }

  // Create order
  const confirmationNumber = `SLY-${randomstring.generate({
    charset: 'alphanumeric',
    capitalization: 'uppercase',
    length: 7,
  })}`

  const order = await db.order.create({
    data: {
      amount: Number(session.cart?.total),
      chefId: session.cart.pendingCartItems[0].chefId,
      confirmationNumber,
      eventDate,
      eventTime,
      dishes: {
        createMany: {
          data: session.cart.pendingCartItems.map(item => ({
            dishId: item.dishId,
            chefId: item.chefId,
            quantity: item.quantity,
          }))
        }
      },
      paymentMethodId,
      userId: Number(session.userId),
    },
    select: {
      confirmationNumber: true,
      id: true,
    }
  })

  // Send email
  if (order) {
    const date = new Date(eventDate)
    const acceptUrl = new URL(`${siteUrl}/orders/${order.confirmationNumber}/confirm`)
    const denyUrl = new URL(`${siteUrl}/orders/${order.confirmationNumber}/deny`)

    const emailData: EmailBodyType = {
      acceptOrderUrl: acceptUrl,
      denyOrderUrl: denyUrl,
      cartItems: session.cart.pendingCartItems,
      orderTotal: session.cart.total,
      confirmationNumber: order.confirmationNumber,
      eventTime,
      eventDate: readableDate(date),
    }
    sendOrderRequestEmail(emailData)
  }

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({
    data: order,
  }))
}

export default api(handler);