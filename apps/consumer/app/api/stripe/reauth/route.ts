import { getChefSession } from "app/lib/auth";
import { getStripeServer } from "app/lib/stripe";

export async function POST() {
	const { chef } = await getChefSession()
	const stripe = getStripeServer();

	const createAccountLink = await stripe.accountLinks.create({
		account: chef.stripeAccountId,
		refresh_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/reauth`,
		return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
		type: "account_onboarding",
	});

	return Response.json({
		url: createAccountLink.url,
	});
}
