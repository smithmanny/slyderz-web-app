import { router } from '../trpc';
import cartRouter from './cartRouter';
import chefRouter from './chefRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';
import accountRouter from './accountRouter';
import stripeRouter from './stripeRouter';
import onboardingRouter from './onboardingRouter';

export const appRouter = router({
  auth: authRouter,
  account: accountRouter,
  cart: cartRouter,
  chef: chefRouter,
  onboarding: onboardingRouter,
  stripe: stripeRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;