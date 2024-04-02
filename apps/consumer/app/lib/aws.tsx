import { SES } from "@aws-sdk/client-ses";
import { render } from "jsx-email";

import EmailActivateAccount from "emails/activate-account";
import EmailChefOrderRequest from "emails/chef-order-request";
import EmailForgotPasswordEmail from "emails/forgot-password";
import EmailNewOrder from "emails/new-order";
import EmailNewOrderApproved from "emails/order-approved";
import EmailNewOrderDenied from "emails/order-denied";
import EmailPasswordChangedEmail from "emails/password-changed";

import type {
	ActivateEmailProps,
	ChefOrderRequestEmailProps,
	EmailBodyProps,
	ForgotPasswordEmailProps,
} from "emails/utils/types";
import type { SESParamsType } from "types";

const REGION = "us-east-1";

export const ses = new SES({
	region: REGION,
});

export function createEmailParams({
	subject,
	to,
	htmlContent,
	textContent,
}: SESParamsType) {
	return {
		Destination: {
			/* required */
			ToAddresses: [
				to,
				/* more items */
			],
		},
		Message: {
			/* required */
			Body: {
				/* required */
				Html: {
					Charset: "UTF-8",
					Data: htmlContent,
				},
				Text: {
					Charset: "UTF-8",
					Data: textContent,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: subject,
			},
		},
		Source: "contact@slyderz.co" /* required */,
	};
}

type EmailParamsType = {
	to: string;
	subject: string;
	htmlContent: string;
	textContent: string;
};
const buildEmailParams = (params: EmailParamsType) => {
	return createEmailParams(params);
};

interface EmailProps<T> {
	to: string;
	data: T;
}
export async function sendActivationEmail({
	to,
	data,
}: EmailProps<ActivateEmailProps>) {
	const htmlContent = await render(<EmailActivateAccount {...data} />);
	const textContent = await render(<EmailActivateAccount {...data} />, {
		plainText: true,
	});

	const params = {
		to,
		subject: "Activate your account",
		htmlContent,
		textContent,
	};
	const input = buildEmailParams(params);
	return await ses.sendEmail(input);
}

export async function sendConsumerNewOrderEmail({
	to,
	data,
}: EmailProps<EmailBodyProps>) {
	const htmlContent = await render(<EmailNewOrder {...data} />);
	const textContent = await render(<EmailNewOrder {...data} />, {
		plainText: true,
	});

	const params = {
		to,
		subject: "We got your request! Your order will be confirmed soon",
		htmlContent,
		textContent,
	};
	const input = buildEmailParams(params);
	return await ses.sendEmail(input);
}

export async function sendChefOrderRequestEmail({
	to,
	data,
}: EmailProps<ChefOrderRequestEmailProps>) {
	const htmlContent = await render(<EmailChefOrderRequest {...data} />);
	const textContent = await render(<EmailChefOrderRequest {...data} />, {
		plainText: true,
	});

	const params = {
		to,
		subject: "You got a new order!",
		htmlContent,
		textContent,
	};
	const input = buildEmailParams(params);
	return await ses.sendEmail(input);
}

export async function sendChefOrderDeniedEmail({
	to,
	data,
}: EmailProps<EmailBodyProps>) {
	const htmlContent = await render(<EmailNewOrderDenied {...data} />);
	const textContent = await render(<EmailNewOrderDenied {...data} />, {
		plainText: true,
	});

	const params = {
		to,
		subject: "Sorry, your order was denied",
		htmlContent,
		textContent,
	};
	const input = buildEmailParams(params);
	return await ses.sendEmail(input);
}

export async function sendChefOrderApprovedEmail({
	to,
	data,
}: EmailProps<EmailBodyProps>) {
	const htmlContent = await render(<EmailNewOrderApproved {...data} />);
	const textContent = await render(<EmailNewOrderApproved {...data} />, {
		plainText: true,
	});

	const params = {
		to,
		subject: "Your order has been appoved!",
		htmlContent,
		textContent,
	};
	const input = buildEmailParams(params);
	return await ses.sendEmail(input);
}

export async function sendforgotPasswordEmail({
	to,
	data,
}: EmailProps<ForgotPasswordEmailProps>) {
	const htmlContent = await render(<EmailForgotPasswordEmail {...data} />);
	const textContent = await render(<EmailForgotPasswordEmail {...data} />, {
		plainText: true,
	});

	const params = {
		to,
		subject: "Reset your Slyderz password",
		htmlContent,
		textContent,
	};
	const input = buildEmailParams(params);
	return await ses.sendEmail(input);
}

export async function sendPasswordChangedEmail({ to }: { to: string }) {
	const htmlContent = await render(<EmailPasswordChangedEmail />);
	const textContent = await render(<EmailPasswordChangedEmail />, {
		plainText: true,
	});

	const params = {
		to,
		subject: "Your password has been changed",
		htmlContent,
		textContent,
	};
	const input = buildEmailParams(params);
	return await ses.sendEmail(input);
}
