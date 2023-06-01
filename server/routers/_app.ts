import { router } from '../trpc';
import accountRouter from './accountRouter';
import authRouter from './authRouter';
import cartRouter from './cartRouter';
import checkoutRouter from './checkoutRouter';
import chefRouter from './chefRouter';
import onboardingRouter from './onboardingRouter';
import stripeRouter from './stripeRouter';
import userRouter from './userRouter';

export const appRouter = router({
  auth: authRouter,
  account: accountRouter,
  cart: cartRouter,
  chef: chefRouter,
  checkout: checkoutRouter,
  onboarding: onboardingRouter,
  stripe: stripeRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;