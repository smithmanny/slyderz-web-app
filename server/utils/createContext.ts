import { getSession } from 'next-auth/react';
import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession({ req: opts.req });

  return {
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
export default createContext