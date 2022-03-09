import { resolver } from "blitz"
import randomstring from "randomstring";

import db from "db"

interface OrderConfirmationNumberType {
  confirmationNumber: string
}

export default resolver.pipe(
  resolver.authorize(),
  async (input, ctx): Promise<string> => {
    const userConfirmationNumber: OrderConfirmationNumberType = await db.$transaction(async (prisma) => {
      const { userId } = ctx.session;
      // 1. Generate random confirmation string
      const generateConfirmationNumber = `SLY-${randomstring.generate({
        charset: 'alphanumeric',
        capitalization: 'uppercase',
        length: 7,
      })}`
      // 2. Save and link order number users order
      const confirmationNumber = await prisma.order.create({
        data: {
          confirmationNumber: generateConfirmationNumber,
          userId,
        },
        select: {
          confirmationNumber: true
        }
      })

      if (!confirmationNumber) {
        throw new Error('Order number was not created.')
      }

      return confirmationNumber;
    })

    return userConfirmationNumber.confirmationNumber;
  }
)
