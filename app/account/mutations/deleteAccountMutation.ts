import { resolver } from "@blitzjs/rpc";

import db from "db"

export default resolver.pipe(
  resolver.authorize(),
  async (input, ctx) => {
    const userId = ctx.session.userId
    return await db.user.delete({
      where: {
        id: userId
      }
    })
  }
)
