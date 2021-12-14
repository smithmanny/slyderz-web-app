const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.BLITZ_PUBLIC_SENDGRID_API_TOKEN)

export default sgMail;
