import { resolver, Ctx } from "blitz"
import { CartItem } from 'types'
import { UpdateMenuItem } from "../validations"

export default resolver.pipe((resolver.zod(UpdateMenuItem)), async (input: any, ctx: Ctx) => {
  const { id, quantity } = input;
  const cartItems = ctx.session?.cart?.pendingCartItems || []
  const index = cartItems.findIndex(elem => elem?.id === id);
  let updatedArray = [...cartItems]

  if (updatedArray[index]) {
    updatedArray[index].quantity += quantity;
  } else {
    throw new Error('Error finding index for selected menu item')
  }

  const total = updatedArray.reduce((total, currentVal: CartItem) => {
    return total += (currentVal.quantity * currentVal.price);
  }, 0)

  // await ctx.session.$setPublicData({ pendingCartItems: [] }) 
  await ctx.session.$setPublicData({ cart: { pendingCartItems: updatedArray, total } })
})