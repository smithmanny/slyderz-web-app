import { TRPCError } from "@trpc/server";

import { setCookie, getCookieServer } from "server/utils/cookieHelpers";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import {
  AddItemToCartType,
  UpdateCartItem,
  DestroyCartItem,
  CreateCartType,
} from "app/cart/validations";
import type { CartItem } from "types";

const chefRouter = router({
  getUserCart: publicProcedure.query(async ({ ctx }) => {
    return ctx.session.cart;
  }),
  addItemToCart: publicProcedure
    .input(AddItemToCartType)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cart = getCookieServer("cart", { req, res });

      let sum = input.price * input.quantity;
      if (cart.items.length !== 0) {
        sum += cart.items.reduce((total, currentVal: CartItem) => {
          return (total += currentVal.quantity * currentVal.price);
        }, 0);
      }

      cart.total = sum;
      cart.items = [...cart.items, input];

      setCookie("cart", cart, { req, res });
      return cart
    }),
  decreaseCartItemQuantity: publicProcedure
    .input(UpdateCartItem)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cart = getCookieServer("cart", { req, res });
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

      return cart
    }),
  increaseCartItemQuantity: publicProcedure
    .input(UpdateCartItem)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cart = getCookieServer("cart", { req, res });
      const index = cart.items.findIndex((elem) => elem.id === input.id);
      const item = cart.items[index];

      if (!item) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item not found",
        });
      }

      item.quantity += input.quantity;

      const total = cart.items.reduce((total: number, currentVal: CartItem) => {
        return (total += currentVal.quantity * currentVal.price);
      }, 0);

      cart.total = total;
      setCookie("cart", cart, { req, res });

      return cart
    }),
  createCart: protectedProcedure
    .input(CreateCartType)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cart = getCookieServer("cart", { req, res });

      cart.eventDate = input.eventDate
      cart.eventTime = input.eventTime
      setCookie("cart", cart, { req, res });

      return cart
    }),
  deleteCartItem: publicProcedure
    .input(DestroyCartItem)
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
      const cart = getCookieServer("cart", { req, res });

      const updatedCartItems: Array<CartItem> = cart.items.filter(
        (item) => item.id !== input.cartItemId
      );
      const sum = updatedCartItems.reduce((total, currentVal: CartItem) => {
        return (total += currentVal.quantity * currentVal.price);
      }, 0);

      cart.total = sum;
      cart.items = [...updatedCartItems];
      setCookie("cart", cart, { req, res });

      return cart
    }),
});

export default chefRouter;
