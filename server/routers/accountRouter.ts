import { TRPCError } from "@trpc/server";

import getCloudinary from "app/utils/getCloudinary";
import { router, protectedProcedure } from "../trpc";
import {
  DeleteStripePaymentMethod,
  CreateImageType,
  DestroyImageType,
  AddUserAddressType,
} from "app/account/validations";

const accountRouter = router({
  deletePaymentMethod: protectedProcedure
    .input(DeleteStripePaymentMethod)
    .mutation(async (opts) => {
      const stripePaymentId = opts.input.paymentMethodId;

      if (!stripePaymentId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No payment method found",
        });
      }

      try {
        const paymentMethod = await opts.ctx.stripe.paymentMethods.detach(
          stripePaymentId
        );
        return paymentMethod;
      } catch (err: any) {
        console.log(err.message);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Payment method not deleted",
        });
      }
    }),
  deleteAccount: protectedProcedure.mutation(async (opts) => {
    const userId = opts.ctx.session.userId;

    try {
      return await opts.ctx.auth.deleteUser(userId);
    } catch (err: any) {
      console.log("Account not deleted", err.mesage);
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Error deleting account",
      });
    }
  }),
  fetchAccountPicture: protectedProcedure.query(async (opts) => {
    const userId = opts.ctx.session.userId;
    const ctx = opts.ctx;

    try {
      const user = await ctx.prisma.authUser.findFirstOrThrow({
        where: {
          id: userId,
        },
        select: {
          image: true,
        },
      });

      if (!user.image || !user.image.imagePublicId) {
        return null;
      }

      return user.image
    } catch (err: any) {
      console.log("Account not deleted", err.mesage);
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Error deleting account",
      });
    }
  }),
  setAccountPicture: protectedProcedure
    .input(CreateImageType)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.userPhoto.create({
          data: {
            imagePublicId: input.publicId,
            imageUrl: input.image,
            userId: ctx.session.userId
          },
        })
      } catch (err: any) {
        console.log("Error uploading cloudinary image", err.message);
        throw new Error("Error uploading cloudinary image");
      }
    }),
  deleteAccountPicture: protectedProcedure
    .input(DestroyImageType)
    .mutation(async ({ input, ctx }) => {
      const cloudinary = getCloudinary();

      try {
        await ctx.prisma.userPhoto.delete({
          where: {
            imagePublicId: input.publicId
          },
        })
        await cloudinary.uploader.destroy(input.publicId);
      } catch (err: any) {
        console.log("Error deleting cloudinary image", err.message);
        throw new Error("Error deleting cloudinary image");
      }
    }),
  createAddress: protectedProcedure
    .input(AddUserAddressType)
    .mutation(async ({ ctx, input }) => {
      const address = await ctx.prisma.address.create({
        data: {
          userId: ctx.session.userId,
          ...input,
        },
        select: {
          address1: true,
          address2: true,
          city: true,
          state: true,
          zipcode: true,
        },
      });

      return address;
    }),
  updateAddress: protectedProcedure
    .input(AddUserAddressType)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.address.update({
        where: {
          userId: ctx.session.userId,
        },
        data: {
          ...input,
        },
      });
    }),
});

export default accountRouter;
