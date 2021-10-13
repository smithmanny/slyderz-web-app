import { getSession, BlitzApiRequest, BlitzApiResponse } from "blitz"
import cryptoRandomString from 'crypto-random-string';
import sendgrid from "integrations/sendgrid";

type OrderRequestMailerProps = {
  to: string
  templateData: object
}

const handler = (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { to, templateData }: OrderRequestMailerProps = req.body;
  const msg = {
    from: 'shakhor@slyderz.co',
    templateId: 'd-2098a0532be343408f1cf09da4cf4fe1',
    personalizations: [
      {
        to,
        dynamic_template_data: templateData
      }
    ]
  }
  sendgrid.send(msg)
  .then(() => {
    res.redirect('/confirmation/1')
  })
  .catch(err => {
    console.error(`Failed to send email ${err}`)
  })
  res.end();
}
export default handler
