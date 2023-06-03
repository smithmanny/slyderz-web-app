import { TRPCError } from "@trpc/server";

import { setCookie, getCookie } from "server/utils/cookieHelpers";
import { router, publicProcedure } from "../trpc";
import {
  AddMenuItemToCartType,
  UpdateMenuItem,
  DestroyMenuItem,
} from "app/cart/validations";
import type { CartItem } from "types";

const chefRouter = router({
  getUserCart: publicProcedure.query(async ({ ctx }) => {
    return ctx.session.cart;
  }),
  addMenuItemToCart: publicProcedure
    .input(AddMenuItemToCartType)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cartCookie = getCookie("cart", { req, res });
      const cart = JSON.parse(String(cartCookie));

      let sum = input.price * input.quantity;
      if (cart.items.length !== 0) {
        sum += cart.items.reduce((total, currentVal: CartItem) => {
          return (total += currentVal.quantity * currentVal.price);
        }, 0);
      }

      cart.total = sum;
      cart.items = [...cart.items, input];

      setCookie("cart", cart, { req, res });
      // return utils.cart.invalidate()
    }),
  decreaseMenuItemQuantity: publicProcedure
    .input(UpdateMenuItem)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cart = getCookie("cart", { req, res });
      const index = cart.items.findIndex((elem) => elem.id === input.id);
      const itemToUpdate = cart.items[index];

      if (!itemToUpdate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item not found",
        });
      }

      if (itemToUpdate.quantity === 1) {
        itemToUpdate.quantity = 1;
      } else {
        itemToUpdate.quantity -= input.quantity;
      }

      const total = cart.items.reduce((total, currentVal: CartItem) => {
        return (total += currentVal.quantity * currentVal.price);
      }, 0);

      cart.total = total;
      setCookie("cart", cart, { req, res });
    }),
  increaseMenuItemQuantity: publicProcedure
    .input(UpdateMenuItem)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cart = getCookie("cart", { req, res });
      const index = cart.items.findIndex((elem) => elem.id === input.id);
      const item = cart.items[index];

      if (!item) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item not found",
        });
      }

      item.quantity += input.quantity;

      const total = cart.items.reduce((total, currentVal: CartItem) => {
        return (total += currentVal.quantity * currentVal.price);
      }, 0);

      cart.total = total;
      setCookie("cart", cart, { req, res });
    }),
  deleteMenuItem: publicProcedure
    .input(DestroyMenuItem)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cart = getCookie("cart", { req, res });

      const updatedCartItems: Array<CartItem> = cart.items.filter(
        (item) => item.id !== input
      );
      const sum = updatedCartItems.reduce((total, currentVal: CartItem) => {
        return (total += currentVal.quantity * currentVal.price);
      }, 0);

      cart.total = sum;
      cart.items = [...updatedCartItems];
      setCookie("cart", cart, { req, res });
    }),
});

export default chefRouter;
