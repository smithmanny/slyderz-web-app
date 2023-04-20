import { SendEmailCommand } from "@aws-sdk/client-ses";
import SesClient from "app/utils/aws/sesClient";
import createEmailParams from "app/utils/aws/createEmailParams";
import fs from 'fs';
import mjml2html from 'mjml'

import { TRANSACTIONAL_EMAILS } from "types";

async function sendSesEmail({ to, subject, type, variables = {} }) {
  let emailTemplate: string

  switch(type) {
    case TRANSACTIONAL_EMAILS.activation:
      emailTemplate = './emails/transactional/mjml/activate.mjml'
      break;
    default:
      throw new Error("Can't send email")
  }


  fs.readFile(emailTemplate, 'utf8', async(err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let html = mjml2html(data)

    if (Object.keys(variables).length > 0) {
      for (const prop in variables) {
        html = html.replaceAll(`{{ ${prop} }}`, variables[prop])
      }
    }

    console.log("MJML FOUND", html);

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