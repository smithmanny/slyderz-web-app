import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import randomstring from "randomstring";

import { readableDate } from "app/helpers/dateHelpers"
import { sendOrderRequestEmail } from "app/helpers"
import db from "db"
import { EmailBodyType } from 'types'

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
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
      chefId: 1,
      confirmationNumber,
      paymentMethodId,
      eventDate,
      eventTime,
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
    const acceptUrl = new URL(`http://localhost:3000/orders/confirm/${order.id}`)
    acceptUrl.searchParams.set('confirmationNumber', order.confirmationNumber)
    const denyUrl = new URL(`http://localhost:3000/orders/deny/${order.id}`)
    acceptUrl.searchParams.set('confirmationNumber', order.confirmationNumber)

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

export default handler