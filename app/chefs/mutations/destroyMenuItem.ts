import { resolver, Ctx } from "blitz"
import { CartItem } from 'types'
import { DestroyMenuItem } from "../validations"

export default resolver.pipe((resolver.zod(DestroyMenuItem)), async (input: any, ctx: Ctx) => {
  const cartItems = ctx.session.cart?.pendingCartItems || [];
  const updatedCartItems: [CartItem] = cartItems.filter(item => item.id !== input.menuItemId)
  const sum = updatedCartItems.reduce((total, currentVal: CartItem) => {
      return total += (currentVal.quantity * currentVal.price);
    }, 0)

  // await ctx.session.$setPublicData({ cart: { pendingCartItems: [], total: 0 } })
  await ctx.session.$setPublicData({ cart: { pendingCartItems: [...updatedCartItems], total: sum } })
})