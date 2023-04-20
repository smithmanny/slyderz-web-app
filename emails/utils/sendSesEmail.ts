import { SendEmailCommand } from "@aws-sdk/client-ses";
import SesClient from "app/utils/aws/sesClient";
import createEmailParams from "app/utils/aws/createEmailParams";
import { SESParamsType } from "types";

async function sendSesEmail({ to, subject, htmlMessage, textMessage }: SESParamsType) {
  const params = {
    to,
    subject,
    htmlMessage,
    textMessage
  }

  try {
    const input = createEmailParams(params)
    const command = new SendEmailCommand(input)
    const response = await SesClient.send(command)

    return response
  } catch(err) {
    console.log(err)
  }
}

export default sendSesEmail