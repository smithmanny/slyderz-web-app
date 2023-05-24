import { router } from '../trpc';
import chefRouter from './chefRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';

export const appRouter = router({
  auth: authRouter,
  chef: chefRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;