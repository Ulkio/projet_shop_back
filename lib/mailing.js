import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const clientId = `976906997239-onf7edtumo6n89vggjt5bc14tj8sovtr.apps.googleusercontent.com`;
const clientSecret = `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`;
const refreshToken = `1//04O30fwJYmoA_CgYIARAAGAQSNwF-L9IrXNPDBwV0kjq3nCDwb2P7nNA-KY0vR0s9X219wloXQN4Z65L9dZf6Oy5uEf9kOECPtog`;
const accessToken = `ya29.A0ARrdaM8EbpsQJRznk29op9VytkB48T3-fGEvLXPY4v2XWySpdQDeHv2cFm6gaGKy1Vw-QmIuq2r-VR4nQEHw6Tf1H_0PE7aZZfB0Et9TPL02XRWfkT-ik9ePGyGRMaUo5xmFgx4wwmdb6VHBpg7kH2OtpF-c`;

export default (mailTo, subject, title, text) => {
  const oauth2Client = new OAuth2(clientId, clientSecret, "https://developers.google.com/oauthplayground");

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "guiguinero95@gmail.com",
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: "",
    to: mailTo,
    subject: subject,
    text: "",
    html: "<b>" + title + "</b><p>" + text + "</p>",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Message sent", info.messageId, info.response);
  });
};
