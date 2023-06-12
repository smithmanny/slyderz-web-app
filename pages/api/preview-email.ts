import { SendEmailCommand } from "@aws-sdk/client-ses";
import SesClient from "app/utils/aws/sesClient";
import fs from "fs";
import mjml2html from "mjml";
import Eta from "emails/utils/useEta";
import previewEmail from "preview-email";

import { readableDate } from "app/utils/dateHelpers";
import { NextApiRequest, NextApiResponse } from "next";
import { TRANSACTIONAL_EMAILS } from "types";

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const variables = {
    to: "shakhorsmith@gmail.com",
    type: TRANSACTIONAL_EMAILS.newOrderChef,
    variables: {
      orderApproveUrl: "http://localhost:3000",
      orderDenyUrl: "http://localhost:3000",
      orderNumber: "1223232",
      orderDate: readableDate(new Date()),
      orderTime: "eventTime",
      orderLocation: "address",
      orderSubtotal: 20,
      orderServiceFee: 10,
      orderTotal: 30,
      // orderItems: order.dishes,
    },
  };

  const emailTemplate = "emails/transactional/views/chef-order-request.eta.mjml"
  fs.readFile(emailTemplate, "utf8", async (err, data) => {
    if (err) {
      console.error("Template error", err);
      throw new Error("Can't preview email", err);
    }

    const emailTemplate = Eta.render(data, variables);
    const html = mjml2html(emailTemplate).html;

    const message = {
      from: "shakhor@slyderz.co",
      to: "shakhorsmith@gmail.com",
      subject: "Preview Email: Testing in dev environment",
      htmlContent: html,
      textContent: "",
    };
    try {
      await previewEmail(message)
    } catch (err: any) {
      console.log("Failed to create email preview", err);
      throw new Error("Can't preview email", err);
    }
  });


  res.status(200).json({
  });
};

export default handler;
