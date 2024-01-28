import { SES } from "@aws-sdk/client-ses";
import { render } from "jsx-email"
import EmailActivateAccount from "emails/activate-account";
import EmailChefOrderRequest from "emails/chef-order-request";
import EmailForgotPasswordEmail from "emails/forgot-password";
import EmailNewOrder from "emails/new-order";
import EmailNewOrderApproved from "emails/order-approved";
import EmailNewOrderDenied from "emails/order-denied";
import EmailPasswordChangedEmail from "emails/password-changed";

import { SESParamsType, SendSesEmailType, TRANSACTIONAL_EMAILS } from "types";

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

export async function sendSesEmail({ to, type, variables }: SendSesEmailType) {
	let Email: any;
	let subject: string;

	switch (type) {
		case TRANSACTIONAL_EMAILS.activation:
			Email = EmailActivateAccount;
			subject = "Activate your account.";
			break;
		case TRANSACTIONAL_EMAILS.newOrderConsumer:
			Email = EmailNewOrder;
			subject = "We got your request! Your order will be confirmed soon.";
			break;
		case TRANSACTIONAL_EMAILS.newOrderChef:
			Email = EmailChefOrderRequest;
			subject = "You got a new order!";
			break;
		case TRANSACTIONAL_EMAILS.denyOrder:
			Email = EmailNewOrderDenied;
			subject = "Sorry, your order was denied.";
			break;
		case TRANSACTIONAL_EMAILS.confirmOrder:
			Email = EmailNewOrderApproved;
			subject = "Your order has been approved!";
			break;
		case TRANSACTIONAL_EMAILS.forgotPassword:
			Email = EmailForgotPasswordEmail;
			subject = "Reset your Slyderz password";
			break;
		case TRANSACTIONAL_EMAILS.passwordReset:
			Email = EmailPasswordChangedEmail;
			subject = "Your password has been changed";
			break;
		default:
			throw new Error("Can't send email");
	}

	const htmlContent = await render(Email(variables), {
		pretty: true,
	});
	const textContent = await render(Email(variables), {
		pretty: true,
		plainText: true,
	});
	const params = {
		to,
		subject,
		htmlContent,
		textContent,
	};

	try {
		const input = createEmailParams(params);
		await ses.sendEmail(input);
	} catch (err: any) {
		console.log("Email template has errors", err);
		throw new Error("Can't send emails", err);
	}
}
