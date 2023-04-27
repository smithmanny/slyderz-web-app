import { resolver } from "@blitzjs/rpc";
import { Ctx } from "blitz";

import { CartItem } from "types";
import { UpdateMenuItem } from "../validations";

export default resolver.pipe(
  resolver.zod(UpdateMenuItem),
  async (input: any, ctx: Ctx) => {
    const { id, quantity } = input;
    const cartItems = ctx.session?.cart?.pendingCartItems || [];
    const index = cartItems.findIndex((elem) => elem?.id === id);
    const updatedArray: CartItem[] = [...cartItems];
    const item = updatedArray[index];

    if (item) {
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity -= quantity;
      }
    } else {
      throw new Error("Error finding index for selected menu item");
    }

    const total = updatedArray.reduce((total, currentVal: CartItem) => {
      return (total += currentVal.quantity * currentVal.price);
    }, 0);

    await ctx.session.$setPublicData({
      cart: { pendingCartItems: updatedArray, total },
    });
  }
);
