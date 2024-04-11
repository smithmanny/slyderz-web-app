import Container from "app/components/Container";
import CreditCardForm from "./CreditCardForm";
import ProfileInfoForm from "./ProfileInfoForm";

import createSetupIntentMutation from "app/actions/mutations/createSetupIntent";
import getAccount from "app/actions/queries/getAccount";

export default async function AccountPage() {
	const stripeClientSecret = createSetupIntentMutation();
	const getUserAccount = getAccount();
	const [clientSecret, userAccount] = await Promise.all([
		stripeClientSecret,
		getUserAccount,
	]);
	const { paymentMethods, user } = userAccount;
	return (
		<Container className="max-w-lg">
			{/* Profile information */}
			<section className="my-6 border-b-2 pb-6">
				<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					Profile Information
				</h4>
				<p className="mb-6 text-sm leading-8 text-gray-600">
					Update your profile information.
				</p>
				<ProfileInfoForm email={user.email} name={user.name} />
			</section>

			{/* Credit card information */}
			<section className="my-6 pb-6">
				<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					Credit Card Information
				</h4>
				<p className="mb-6 text-sm leading-8 text-gray-600">
					Update your credit card information.
				</p>
				<CreditCardForm
					clientSecret={clientSecret}
					paymentMethods={paymentMethods}
				/>
			</section>
		</Container>
	);
}
