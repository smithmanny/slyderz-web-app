import { getStripeServer } from "app/lib/stripe";
import { getProtectedSession } from "app/lib/auth";

export default async function fetchUserPaymentMethodsQuery() {
  const session = await getProtectedSession()

  const stripe = getStripeServer()
  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: "card",
  });

  return paymentMethods.data;
}