import { SendEmailCommand } from "@aws-sdk/client-ses";
import SesClient from "app/utils/aws/sesClient";
import createEmailParams from "app/utils/aws/createEmailParams";
import fs from 'fs';
import mjml2html from 'mjml'
import Eta from './useEta'

import { TRANSACTIONAL_EMAILS, SendSesEmailType } from "types";

async function sendSesEmail({ to, type, variables = {} }: SendSesEmailType) {
  let emailTemplate: string
  let subject: string

  switch(type) {
    case TRANSACTIONAL_EMAILS.activation:
      emailTemplate = './emails/transactional/views/activate.eta.mjml'
      subject = 'Activate your account.'
      break;
    case TRANSACTIONAL_EMAILS.newOrderConsumer:
      emailTemplate = './emails/transactional/views/new-order.eta.mjml'
      subject = 'We got your request! Your order will be confirmed soon.'
      break;
    case TRANSACTIONAL_EMAILS.newOrderChef:
      emailTemplate = './emails/transactional/views/chef-order-request.eta.mjml'
      subject = 'You got a new order!'
      break;
    case TRANSACTIONAL_EMAILS.denyOrder:
      emailTemplate = './emails/transactional/views/order-denied.eta.mjml'
      subject = 'Sorry, your order was denied.'
      break;
    case TRANSACTIONAL_EMAILS.confirmOrder:
      emailTemplate = './emails/transactional/views/order-approved.eta.mjml'
      subject = 'Your order has been approved!'
      break;
    default:
      throw new Error("Can't send email")
  }

  if (!subject || !emailTemplate) {
    throw new Error("Can't send email")
  }

  // 1. Read email mjml file
  // 2. Get vars for template - json file
  // 3. Replace {{}} with vars
  // 4. Convert from mjml to html
  fs.readFile(emailTemplate, 'utf8', async(err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const emailTemplate = Eta.render(data, variables)
    const html = mjml2html(emailTemplate).html

    const params = {
      to,
      subject,
      htmlContent: html,
      textContent: ''
    }
    try {
      const input = createEmailParams(params)
      const command = new SendEmailCommand(input)
      const response = await SesClient.send(command)

      return response
    } catch(err) {
      console.log(err)
    }
  })
}

export default sendSesEmail