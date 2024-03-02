import { Heading, Hr, Link, Section, Text } from "jsx-email";
import * as React from "react";

import EmailButton from "../components/EmailButton";
import EmailHeader from "../components/Header";
import SlyderzEmailLayout from "./index";

interface EmailActivateAccountProps {
	activationUrl: string;
}

export const EmailActivateAccount = ({
	activationUrl,
}: EmailActivateAccountProps) => {
	return (
		<SlyderzEmailLayout previewText="Activate email">
			<EmailHeader>Welcome to Slyderz</EmailHeader>
			<Text className="text-black text-[14px] leading-[24px]">
				Please click the button below to activate your account.
			</Text>

			<Section className="text-center mt-[32px] mb-[32px]">
				<EmailButton link={activationUrl}>Activate your account</EmailButton>
			</Section>
			<Text className="text-black text-[14px] leading-[24px]">
				or copy and paste this URL into your browser:{" "}
				<Link href={activationUrl} className="text-blue-600 no-underline">
					{activationUrl}
				</Link>
			</Text>
			<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
			<Text className="text-[#666666] text-[12px] leading-[24px]">
				If you were not expecting this email, you can ignore it. If you are
				concerned about your account&apos;s safety, please reply to this email
				to get in touch with us.
			</Text>
		</SlyderzEmailLayout>
	);
};

export default EmailActivateAccount;
