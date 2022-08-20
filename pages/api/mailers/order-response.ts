import { api } from "app/blitz-server";
import { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "integrations/sendgrid";

type OrderRequestMailerProps = {
  to: string
  templateData: TemplateDataProps
  response: Boolean
}

type TemplateDataProps = {
  response?: Boolean
}

const FROM_EMAIL = 'shakhor@slyderz.co'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { to, templateData, response }: OrderRequestMailerProps = req.body;
  const approvedOrderEmail = {
    from: FROM_EMAIL,
    templateId: 'd-93d1c60ef3fb44969380557049762d19',
    personalizations: [
      {
        to,
        dynamic_template_data: templateData
      }
    ]
  }
  const deniedOrderEmail = {
    from: FROM_EMAIL,
    templateId: 'd-5f1c225d5a4a4d4c9cdc1303a7fa59c7',
    personalizations: [
      {
        to,
        dynamic_template_data: templateData
      }
    ]
  }

  sendgrid.send(response ? approvedOrderEmail : deniedOrderEmail)
    .catch(err => {
      console.error(`Failed to send email ${err}`)
    })
  res.end();
}
export default api(handler);
