import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { getStripeServer } from 'app/utils/getStripe';
import prisma from 'db';
import { auth } from 'integrations/auth/lucia';

interface SessionType {
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

const createContext = async (opts: CreateNextContextOptions) => {
  const authRequest = auth.handleRequest({ req: opts.req, res: opts.res })
  const { session, user } = await authRequest.validateUser()
  let slyderzSession = {} as SessionType

  if (session) {
    slyderzSession = {
      ...session,
      user: {
        ...user
      }
    }
  }

  return {
    auth,
    authRequest,
    stripe,
    session: slyderzSession,
    prisma,
    req: opts.req,
    res: opts.res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
export default createContext