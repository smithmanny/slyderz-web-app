import { SendEmailCommand } from "@aws-sdk/client-ses";
import { render } from '@react-email/render';

import SesClient from "app/utils/aws/sesClient";
import createEmailParams from "app/utils/aws/createEmailParams";
import EmailActivateAccount from "emails/activate-account";
import EmailForgotPasswordEmail from "emails/forgot-password";
import EmailPasswordChangedEmail from "emails/password-changed";
import EmailChefOrderRequest from "emails/chef-order-request";
import EmailNewOrder from "emails/new-order";
import EmailNewOrderApproved from "emails/order-approved";
import EmailNewOrderDenied from "emails/order-denied";

import fs from "fs";
import mjml2html from "mjml";
import Eta from "./useEta";

import { TRANSACTIONAL_EMAILS, SendSesEmailType } from "types";

async function sendSesEmail({ to, type, variables = {} }: SendSesEmailType) {
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

  const htmlContent = render(Email(variables), {
    pretty: true,
  })
  const textContent = render(Email(variables), {
    pretty: true,
    plainText: true
  })
  const params = {
    to,
    subject,
    htmlContent,
    textContent,
  };
  try {
    const input = createEmailParams(params);
    const command = new SendEmailCommand(input);
    const response = await SesClient.send(command);

    return response;
  } catch (err: any) {
    console.log("Email template has errors", err);
    throw new Error("Can't send emails", err);
  }
}

export default sendSesEmail;
