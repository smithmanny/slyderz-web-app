import { resolver } from "blitz"
const randomstring = require("randomstring");

import db from "db"

export default resolver.pipe(
  resolver.authorize(),
  async (input, ctx) => {
    let createOrderNumber;
    await db.$transaction(async (prisma) => {
      const { userId } = ctx.session;

      // 1. Generate random confirmation string
      const confirmationNumber = randomstring.generate(7);
      // 2. Check to make sure that confirmation string hasn't been used and save it to users order
      createOrderNumber = await prisma.order.create({
        data: {
          confirmationNumber,
          userId,
        },
        select: {
          confirmationNumber: true
        }
      })
      const confirmationNumberExists = await prisma.user.findUnique({
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
      console.log({ confirmationNumberExists })
      if (confirmationNumberExists) {
        throw new Error('Confirmation number already exists.')
      }
    })
    return createOrderNumber
  }
)
