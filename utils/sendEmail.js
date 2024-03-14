// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
  const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
  });

  const mailOpt = {
    from:'E-tunisia shop App <belhajboubakera@gmail.com>',
    to:options.email,
    subject:options.subject,
    text:options.message
  }

  await transporter.sendMail(mailOpt);
};

module.exports = sendEmail;