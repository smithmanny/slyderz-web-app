import { getProtectedSession } from "app/lib/auth";
import { getStripeServer } from "app/lib/stripe";

export default async function fetchUserPaymentMethodsQuery() {
	const session = await getProtectedSession();

	const stripe = getStripeServer();
	const paymentMethods = await stripe.paymentMethods.list({
		customer: session.stripeCustomerId,
		type: "card",
	});

	return paymentMethods.data;
}
