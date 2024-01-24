import { TRPCError } from "@trpc/server";
import getCloudinary from "app/lib/cloudinary";
import { router, protectedProcedure, publicProcedure } from "../trpc";
import {
  DeleteStripePaymentMethod,
  CreateImageType,
  DestroyImageType,
  AddUserAddressType,
} from "app/validations/aboutValidations";

const userRouter = router({
  fetchUserData: publicProcedure.query(async (opts) => {
    const ctx = opts.ctx;
    const { user } = ctx.session;

    if (Object.keys(user).length === 0) {
      return null
    }

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

    async function isUserChef() {
      return ctx.prisma.chef.findFirst({
        where: {
          userId: ctx.session.user.userId,
        },
      });
    }

    const [paymentMethods, address, chef] =
      await Promise.all([
        getStripePayments(user.stripeCustomerId),
        getAddress(user.userId),
        isUserChef()
      ]);

    const userId = user.userId;
    const email = {
      emailAddress: user.email,
      isVerified: user.emailVerified
    } as { emailAddress: string, isVerified: boolean};
    const name = user.name;
    const isChef = {
      isChef: !!chef || false,
      isChefProfileComplete: chef?.isOnboardingComplete || false,
      onboardingState: chef?.onboardingState
    }

    return {
      paymentMethods,
      address,
      userId,
      email,
      name,
      chef: isChef
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
