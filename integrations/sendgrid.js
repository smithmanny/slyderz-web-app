const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_TOKEN);

export default sgMail;
