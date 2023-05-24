import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { getStripeServer } from 'app/utils/getStripe';
import prisma from 'db';
import { auth as lucia } from 'integrations/auth/lucia';

const stripe = getStripeServer()

const createContext = async (opts: CreateNextContextOptions) => {
  const cookies = opts.req.cookies
  const sessionId = cookies["auth_session"]

  const getSession = await lucia.getSessionUser(sessionId || "")
  const session = {
    ...getSession.session,
    user: {
      ...getSession.user
    }
  }

  const authRequest = lucia.handleRequest({ req: opts.req, res: opts.res })
  const auth = {
    ...lucia,
    authRequest
  }

  return {
    auth,
    stripe,
    session,
    prisma
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
export default createContext