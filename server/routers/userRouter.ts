import { hasCookie, getCookie, setCookie } from 'cookies-next';

import { router, publicProcedure } from '../trpc';
import type { Address } from "@prisma/client"
import type { Stripe } from "stripe"

interface UserChefStatusType {
  isChef: boolean
  isChefProfileComplete: boolean
}

type InitialUserCartType = {
  cart: {
    pendingCartItems: Array<any>
    total: string
  }
}

const userRouter = router({
  fetchInitialData: publicProcedure
    .query(async (opts) => {
      const ctx = opts.ctx

      async function getStripePayments(stripeCustomerId: string) {
        const paymentMethods = await ctx.stripe.paymentMethods.list({
          customer: stripeCustomerId,
          type: "card",
        });

        return paymentMethods
      }

      async function getAddress(userId: string) {
        const user = await ctx.prisma.authUser.findUniqueOrThrow({
          where: {
            id: userId
          },
          select: {
            address: {
              select: {
                address1: true,
                address2: true,
                city: true,
                state: true,
                zipcode: true,
              }
            }
          }
        })

        return user.address
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
          return { isChef: false, isChefProfileComplete: false }
        }

        if (!!chef.isOnboardingComplete) {
          return { isChef: true, isChefProfileComplete: true }
        } else {
          return { isChef: true, isChefProfileComplete: false }
        }
      }

      function getCartCookie() {
        const cartCookie = getCookie("user_cart", { req: opts.ctx.req, res: opts.ctx.res })
        const initialUserCart: InitialUserCartType = {
          cart: {
            pendingCartItems: [],
            total: "0"
          }
        }

        if (!cartCookie) {
          setCookie("user_cart", initialUserCart, {
            req: opts.ctx.req,
            res: opts.ctx.res,
            maxAge: 60 * 6 * 24,
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
          })
          return initialUserCart
        } else {
          const userCart: InitialUserCartType = JSON.parse(String(cartCookie))

          return {
            cart: {
              pendingCartItems: userCart.cart.pendingCartItems,
              total: userCart.cart.total
            }
          }
        }
      }

      const session = ctx.session
      // const cartCookie = getCartCookie()
      let userId: string = ""
      let paymentMethods = {} as Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>
      let address: Address | {} | null = {}
      let checkUserChefStatus: UserChefStatusType = {
        isChef: false,
        isChefProfileComplete: false
      }

      if (session.userId) {
        const stripePayments = getStripePayments(session.user.stripeCustomerId)
        const userAddress = getAddress(session.userId)
        const chefStatus = getChefStatus(session.userId)
        const [_paymentMethods, _address, _checkUserChefStatus] = await Promise.all([
          stripePayments, userAddress, chefStatus
        ])

        paymentMethods = _paymentMethods
        address = _address
        checkUserChefStatus = _checkUserChefStatus
        userId = session.userId
      }

      return {
        paymentMethods,
        address,
        checkUserChefStatus,
        userId,
        email: session.user.email,
        name: session.user.name
      }
    }),
});

export default userRouter