import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from "next-auth/next";

import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getStripeServer } from 'app/utils/getStripe';
import prisma from 'db';

const stripe = getStripeServer()

const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getServerSession(opts.req, opts.res, authOptions);

  return {
    stripe,
    session,
    prisma
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
export default createContext