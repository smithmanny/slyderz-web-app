const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_TOKEN)

export default sgMail;
