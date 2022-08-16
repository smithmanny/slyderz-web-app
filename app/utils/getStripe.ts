import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");
  }
  return stripePromise;
};

export default getStripe;
