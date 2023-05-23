import { Stripe, loadStripe } from "@stripe/stripe-js";
import { default as StripeServer } from "stripe";
import type StripeServerType from "stripe";

let stripePromise: Promise<Stripe | null>;
let stripeServer: StripeServerType

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");
  }
  return stripePromise;
};

export const getStripeServer = (): StripeServerType => {
  if (!stripeServer) {
    return new StripeServer(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2022-11-15",
    });
  }

  return stripeServer
};

export default getStripe;
