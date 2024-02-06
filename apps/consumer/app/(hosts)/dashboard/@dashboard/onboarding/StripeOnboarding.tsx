import { Button } from "app/components/ui/button";

export default function StripeOnboardingStep() {
	return (
		<div className="pt-8">
			<p className="text-sm leading-8 text-gray-600">
				We know that time is money, so we make it easy for you to get paid for
				your work. Once you complete an event, we'll send you an instant payment
				directly to your linked bank account. We use Stripe, a secure payment
				processing platform, to ensure that your payments are processed quickly
				and safely.
			</p>

			<Button className="mt-2 pl-0" variant="ghost">
				Click here to link bank account
			</Button>
		</div>
	);
}
