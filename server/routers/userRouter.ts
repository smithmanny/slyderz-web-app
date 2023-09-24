import { TRPCError } from "@trpc/server";
import type { Address } from "@prisma/client";

import getCloudinary from "app/utils/getCloudinary";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import {
  DeleteStripePaymentMethod,
  CreateImageType,
  DestroyImageType,
  AddUserAddressType,
} from "app/account/validations";

interface UserChefStatusType {
  isChef: boolean;
  isChefProfileComplete: boolean;
}

const userRouter = router({
  fetchInitialData: publicProcedure.query(async (opts) => {
    const ctx = opts.ctx;

    async function getStripePayments(stripeCustomerId: string) {
      const paymentMethods = await ctx.stripe.paymentMethods.list({
        customer: stripeCustomerId,
        type: "card",
      });

      return paymentMethods.data;
    }

    async function getAddress(userId: string) {
      const user = await ctx.prisma.authUser.findUniqueOrThrow({
        where: {
          id: userId,
        },
        select: {
          address: {
            select: {
              address1: true,
              address2: true,
              city: true,
              state: true,
              zipcode: true,
            },
          },
        },
      });

      return user.address;
    }

    async function getChefStatus(userId: string) {
      const chef = await ctx.prisma.chef.findFirst({
        where: { userId: userId },
        select: {
          stripeAccountId: true,
          isOnboardingComplete: true,
        },
      });

      if (!chef) {
        return { isChef: false, isChefProfileComplete: false };
      }

      if (chef.isOnboardingComplete) {
        return { isChef: true, isChefProfileComplete: true };
      } else {
        return { isChef: true, isChefProfileComplete: false };
      }
    }

    const session = ctx.session;
    let userId = "";
    let paymentMethods: Array<any> = [];
    let address: Address | object | null = {};
    let email = {};
    let name = "";
    let checkUserChefStatus: UserChefStatusType = {
      isChef: false,
      isChefProfileComplete: false,
    };

    if (session.sessionId) {
      const stripePayments = getStripePayments(session.user.stripeCustomerId);
      const userAddress = getAddress(session.user.userId);
      const chefStatus = getChefStatus(session.user.userId);
      const [_paymentMethods, _address, _checkUserChefStatus] =
        await Promise.all([stripePayments, userAddress, chefStatus]);

      paymentMethods = _paymentMethods;
      address = _address;
      checkUserChefStatus = _checkUserChefStatus;
      userId = session.user.userId;
      email = {
        emailAddress: session.user.email,
        isVerified: session.user.emailVerified
      } as { emailAddress: string, isVerified: boolean};
      name = session.user.name;
    }

    return {
      paymentMethods,
      address,
      checkUserChefStatus,
      userId,
      email,
      name,
    };
  }),
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
    const userId = opts.ctx.session.user.userId;

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
    const userId = opts.ctx.session.user.userId;
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
            userId: ctx.session.user.userId
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
          userId: ctx.session.user.userId,
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
          userId: ctx.session.user.userId,
        },
        data: {
          ...input,
        },
      });
    }),
});

export default userRouter;
