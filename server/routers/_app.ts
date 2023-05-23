import { router } from '../trpc';
import chefRouter from './chefRouter';
import authRouter from './authRouter';

export const appRouter = router({
  auth: authRouter,
  chef: chefRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;