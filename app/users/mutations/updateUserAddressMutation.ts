import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";

import db from "db";
import { AddUserAddress } from "../validations";

export default resolver.pipe(
  resolver.zod(AddUserAddress),
  resolver.authorize(),
  async (input, ctx) => {
    const user = await db.user.update({
      where: { id: ctx.session.userId },
      data: {
        address: {
          upsert: {
            create: {
              ...input
            },
            update: {
              ...input
            }
          }
        }
      },
      select: {
        address: {
          select: {
            address1: true,
            address2: true,
            city: true,
            state: true,
            zipcode: true,
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }
);
