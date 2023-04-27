import { Stripe, loadStripe } from "@stripe/stripe-js";
import { default as StripeServer } from "stripe";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");
  }
  return stripePromise;
};

export const getStripeServer = () => {
  return new StripeServer(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
  });
};

export default getStripe;
