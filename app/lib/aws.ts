import { SESParamsType } from "types";
import { SES } from "@aws-sdk/client-ses";

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
