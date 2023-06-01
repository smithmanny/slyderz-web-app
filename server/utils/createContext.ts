import { inferAsyncReturnType } from '@trpc/server';
import { getCookie, setCookie } from 'cookies-next';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { getStripeServer } from 'app/utils/getStripe';
import prisma from 'db';
import { auth } from 'integrations/auth/lucia';
import { Cart } from 'types';

type SessionType = {
  userId: string
  sessionId: string
  user: {
    userId: string
    email: string
    name: string
    stripeCustomerId: string
  }
}

const stripe = getStripeServer()

function getCartCookie(req, res) {
  const cartCookie = getCookie("cart", { req, res })
  const initialUserCart: Cart = {
    items: [],
    total: 0
  }

  if (!cartCookie) {
    setCookie("cart", initialUserCart, {
      req,
      res,
      maxAge: 60 * 6 * 24,
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
    })
    return initialUserCart
  } else {
    const userCart: Cart = JSON.parse(String(cartCookie))

    return {
      items: userCart.items,
      total: userCart.total
    }
  }
}

const createContext = async (opts: CreateNextContextOptions) => {
  const authRequest = auth.handleRequest({ req: opts.req, res: opts.res })
  const cart = getCartCookie(opts.req, opts.res)
  const { session, user } = await authRequest.validateUser()
  const authSession = {
    ...session,
    user: {
      ...user
    },
    cart
  } as SessionType

  return {
    auth,
    authRequest,
    cart,
    stripe,
    session: authSession,
    prisma,
    req: opts.req,
    res: opts.res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
export default createContext