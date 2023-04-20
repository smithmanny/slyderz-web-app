import { SESParamsType } from "types";

function createEmailParams({ subject, to, htmlMessage, textMessage }: SESParamsType) {
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
          Data: htmlMessage
        },
        Text: {
          Charset: "UTF-8",
          Data: textMessage
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