import { resolver } from "blitz"
import randomstring from "randomstring";

import db from "db"

interface OrderConfirmationNumberType {
  confirmationNumber: string
}

export default resolver.pipe(
  resolver.authorize(),
  async (input, ctx): Promise<object> => {
    const userOrderRequest: OrderConfirmationNumberType = await db.$transaction(async (prisma) => {
      const { userId } = ctx.session;
      // 1. Generate random confirmation string
      const generateConfirmationNumber = `SLY-${randomstring.generate({
        charset: 'alphanumeric',
        capitalization: 'uppercase',
        length: 7,
      })}`
      // 2. Save and link order number users order
      const order = await prisma.order.create({
        data: {
          amount: 12,
          chefId: 1,
          confirmationNumber: generateConfirmationNumber,
          paymentMethod: 'ss',
          userId,
        },
        select: {
          confirmationNumber: true,
          id: true
        }
      })

      if (!order) {
        throw new Error('Order number was not created.')
      }

      return order;
    })

    return userOrderRequest;
  }
)
