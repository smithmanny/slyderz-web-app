import { resolver } from "@blitzjs/rpc";
import { Ctx } from "blitz";
import { CartItem } from "types";

import { CreateMenuItem } from "../validations";

export default resolver.pipe(
  resolver.zod(CreateMenuItem),
  async (input: any, ctx: Ctx) => {
    const cartItem: CartItem = {
      ...input,
    };
    const cartItems = ctx.session?.cart?.pendingCartItems || [];
    let sum = input.price * input.quantity;

    // Update total if cart already has items
    if (cartItems.length !== 0) {
      sum += cartItems.reduce((total, currentVal: CartItem) => {
        return (total += currentVal.quantity * currentVal.price);
      }, 0);
    }

    await ctx.session.$setPublicData({
      cart: {
        pendingCartItems: [...cartItems, cartItem],
        total: sum,
      },
    });
  }
);
