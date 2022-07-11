import { resolver } from "blitz"

export default resolver.pipe(
  resolver.authorize(),
  async (input, ctx) => {
    return await ctx.session.$setPublicData({
      cart: {
        pendingCartItems: [],
        total: 0,
      }
    })
  }
)
