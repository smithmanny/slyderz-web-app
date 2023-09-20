import { router, publicProcedure } from "../trpc";
import type { Address } from "@prisma/client";

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
});

export default userRouter;
