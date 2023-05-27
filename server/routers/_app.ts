import { router } from '../trpc';
import chefRouter from './chefRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';
import accountRouter from './accountRouter';
import stripeRouter from './stripeRouter';

export const appRouter = router({
  auth: authRouter,
  account: accountRouter,
  chef: chefRouter,
  stripe: stripeRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;