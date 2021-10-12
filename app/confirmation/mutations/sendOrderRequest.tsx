import { resolver } from "blitz"
const randomstring = require("randomstring");

import db from "db"

export default resolver.pipe(
  resolver.authorize(),
  async ({ }, ctx) => {
    let createOrderNumber;
    await db.$transaction(async (prisma) => {
      const { userId } = ctx.session;
      // 1. Generate random confirmation string
      const confirmationNumber = randomstring.generate(7);
      // 2. Check to make sure that confirmation string hasn't been used and save it to users order
      createOrderNumber = await db.order.create({
        data: {
          confirmationNumber,
          userId,
        },
        select: {
          confirmationNumber
        }
      })
      const confirmationNumberExists = await db.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          orders: {
            where: {
              confirmationNumber,
            }
          }
        }
      })
      if (confirmationNumberExists) {
        throw new Error('Confirmation number already exists.')
      }
    })
    return createOrderNumber
  }
)
