import nodemailer from "nodemailer";
import { google } from "googleapis";
import "dotenv/config";

const OAuth2 = google.auth.OAuth2;

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_ACCESS_TOKEN } = process.env;
const clientId = GMAIL_CLIENT_ID;
const clientSecret = GMAIL_CLIENT_SECRET;
const refreshToken = GMAIL_REFRESH_TOKEN;
const accessToken = GMAIL_ACCESS_TOKEN;

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
