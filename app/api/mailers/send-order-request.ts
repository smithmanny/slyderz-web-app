import { getSession, BlitzApiRequest, BlitzApiResponse } from "blitz"
import sendgrid from "integrations/sendgrid";

type OrderRequestMailerProps = {
  to: string
  templateData: TemplateDataProps
}

type TemplateDataProps = {
  to: string
  location: string
}

const handler = (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { to, templateData }: OrderRequestMailerProps = req.body;
  const consumerMsg = {
    from: 'shakhor@slyderz.co',
    templateId: 'd-2098a0532be343408f1cf09da4cf4fe1',
    personalizations: [
      {
        to,
        dynamic_template_data: templateData
      }
    ]
  }
  const chefMsg = {
    from: 'shakhor@slyderz.co',
    templateId: 'd-dbc3f3d3b14e4f02b51e36e2a30b2376',
    personalizations: [
      {
        to,
        dynamic_template_data: templateData
      }
    ]
  }
  sendgrid.send(consumerMsg)
  .then(() => sendgrid.send(chefMsg))
  .catch(err => {
    console.error(`Failed to send email ${err}`)
  })
  // res.end(JSON.stringify({ name: "John Doe" }))
  res.end();
}
export default handler
