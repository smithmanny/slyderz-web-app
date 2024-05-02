import { Section, Text } from "jsx-email";

import EmailButton from "../components/EmailButton";
import type { ForgotPasswordEmailProps } from "../utils/types";
import SlyderzEmailLayout from "./";

export const EmailForgotPasswordEmail = ({
	resetPasswordUrl,
}: ForgotPasswordEmailProps) => {
	return (
		<SlyderzEmailLayout previewText="You requested to change your password.">
			<Section>
				<Text style={text}>
					Someone recently requested a password change for your Slyderz account.
					If this was you, you can set a new password here:
				</Text>
				<EmailButton link={resetPasswordUrl}>Reset password</EmailButton>
				<Text style={text}>
					If you don&apos;t want to change your password or didn&apos;t request
					this, just ignore and delete this message.
				</Text>
				<Text style={text}>
					To keep your account secure, please don&apos;t forward this email to
					anyone.
				</Text>
			</Section>
		</SlyderzEmailLayout>
	);
};

export default EmailForgotPasswordEmail;

const text = {
	fontSize: "16px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "300",
	color: "#404040",
	lineHeight: "26px",
};
