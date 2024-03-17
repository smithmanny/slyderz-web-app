import { getProtectedSession } from "app/lib/auth";
import { getStripeServer } from "app/lib/stripe";

export default async function fetchUserPaymentMethodsQuery() {
	const { user } = await getProtectedSession();

	const stripe = getStripeServer();
	const paymentMethods = await stripe.paymentMethods.list({
		customer: user.stripeCustomerId,
		type: "card",
	});

	return paymentMethods.data;
}
