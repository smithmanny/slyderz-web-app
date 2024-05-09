import Container from "app/components/Container";
import { UploadImage } from "app/components/UploadImage";
import AccountAddressForm from "./AddressForm";
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
	const { paymentMethods, user, address } = userAccount;

	return (
		<Container className="max-w-lg">
			{/* Avatar section */}
			<section>
				<UploadImage profilePhoto={user.headshotUrl} />
			</section>

			<div className="border-b-2 my-9" />

			{/* Profile information */}
			<section>
				<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					Profile Information
				</h4>
				<p className="mb-6 text-sm leading-8 text-gray-600">
					Update your profile information.
				</p>
				<ProfileInfoForm email={user.email} name={user.name} />
			</section>

			<div className="border-b-2 my-9" />

			<section>
				<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					Address
				</h4>
				<p className="mb-6 text-sm leading-8 text-gray-600">
					Update your addresses.
				</p>
				<AccountAddressForm address={address} />
			</section>

			<div className="border-b-2 my-9" />

			{/* Credit card information */}
			<section>
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
