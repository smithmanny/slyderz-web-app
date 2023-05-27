import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import getCloudinary from "app/utils/getCloudinary"
import { router, protectedProcedure } from '../trpc';
import { DeleteStripePaymentMethod, DestroyImageType } from 'app/account/validations';

const cloudinary = getCloudinary()

const accountRouter = router({
  deletePaymentMethod: protectedProcedure
    .input(DeleteStripePaymentMethod)
    .mutation(async (opts) => {
      const stripePaymentId = opts.input

      if (!stripePaymentId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No payment method found"
        })
      }

      try {
        const paymentMethod = await opts.ctx.stripe.paymentMethods.detach(stripePaymentId);
        return paymentMethod;
      } catch(err) {
        console.log(err.message)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Payment method not deleted"
        })
      }
    }),
  deleteAccount: protectedProcedure
    .mutation(async opts => {
      const userId = opts.ctx.session.userId

      try {
        return await opts.ctx.auth.deleteUser(userId)
      } catch (err) {
        console.log("Account not deleted", err.mesage)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Error deleting account"
        })
      }
    }),
  deleteAccountPicture: protectedProcedure
    .input(DestroyImageType)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.auth.updateUserAttributes(ctx.session.userId, {
          image: null,
          imagePublicId: null
        })
        await cloudinary.uploader.destroy(input)
      } catch (err) {
        console.log("Error deleting cloudinary image", err.message)
        throw new Error("Error deleting cloudinary image")
      }
    })
});

export default accountRouter