import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession({ req: opts.req });

  return {
    session,
  };
};