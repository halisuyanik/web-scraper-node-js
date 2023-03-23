const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

const senderMail=async(work)=>{

    let info = await transporter.sendMail({
      from: `"${process.env.MAIL_USERNAME}"`, // sender address
      to: `"${process.env.MAIL_USERNAME}"`, // list of receivers
      subject: "new job ✔", // Subject line
      text: `"new job ${work}"`, // plain text body
    });
    
    console.log("email sent")
}

module.exports={senderMail}