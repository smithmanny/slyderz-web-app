import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { default as StripeServer } from "stripe";
import type StripeServerType from "stripe";

let stripePromise: Promise<Stripe | null>;
let stripeServer: StripeServerType;

export const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");
	}
	return stripePromise;
};

export const getStripeServer = (): StripeServerType => {
	if (!stripeServer) {
		return new StripeServer(process.env.STRIPE_SECRET_KEY || "", {
			apiVersion: "2023-10-16",
		});
	}

	return stripeServer;
};
