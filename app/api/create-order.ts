import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import randomstring from "randomstring";

import db from "db"

interface OrderConfirmationNumberType {
  confirmationNumber: string
}

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async(req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { paymentMethod, orderTotal, userId } = req.body;
  let pendingOrder

  await db.$transaction(async (prisma) => {
    if (!userId) {
      throw new Error("Can't create order without a user")
    }

    // 1. Generate random confirmation string
    const generateConfirmationNumber = `SLY-${randomstring.generate({
      charset: 'alphanumeric',
      capitalization: 'uppercase',
      length: 7,
    })}`

    // 2. Save and link order number users order
    const order = await prisma.order.create({
      data: {
        amount: Number(orderTotal),
        chefId: 1,
        confirmationNumber: generateConfirmationNumber,
        paymentMethod,
        userId: Number(userId),
      },
      select: {
        confirmationNumber: true,
        id: true
      }
    })

    if (!order) {
      throw new Error('Order number was not created.')
    }

    pendingOrder = order
    return order;
  })

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ pendingOrder }))
}

export default handler