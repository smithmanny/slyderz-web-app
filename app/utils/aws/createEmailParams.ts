import { SESParamsType } from "types";

function createEmailParams({ subject, to, htmlContent, textContent }: SESParamsType) {
  return {
    Destination: { /* required */
      ToAddresses: [
        to,
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Charset: "UTF-8",
          Data: htmlContent
        },
        Text: {
          Charset: "UTF-8",
          Data: textContent
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: "contact@slyderz.co", /* required */
  };
}

export default createEmailParams