import "dotenv/config";
import nodemailer from "nodemailer";
import { registrationEmailTemplate } from "../email.template";
import { notThrowDotEnvError, requireEnvVars } from "../../utils/dotenv";

const [SERVER_URI, EMAIL_PROVIDER, EMAIL_SENDER, EMAIL_SENDER_PASSWORD] = requireEnvVars([
  "SERVER_URI",
  "EMAIL_PROVIDER",
  "EMAIL_SENDER",
  "EMAIL_SENDER_PASSWORD",
]);

// Aruba settings
const isGmail = EMAIL_PROVIDER!.toLowerCase() === "gmail";

const [EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE] = requireEnvVars(
  ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_SECURE"],
  notThrowDotEnvError
);
if (isGmail) {
  requireEnvVars(["EMAIL_HOST", "EMAIL_PORT", "EMAIL_SECURE"]);
}

export class EmailService {
  private transporter;

  constructor() {
    const isGmail = EMAIL_PROVIDER!.toLowerCase() === "gmail";

    const transportOptions = isGmail
      ? {
          service: "gmail",
          auth: {
            user: EMAIL_SENDER,
            pass: EMAIL_SENDER_PASSWORD,
          },
        }
      : {
          host: EMAIL_HOST,
          port: Number(EMAIL_PORT),
          secure: EMAIL_SECURE,
          auth: {
            user: EMAIL_SENDER,
            pass: EMAIL_SENDER_PASSWORD,
          },
        };

    this.transporter = nodemailer.createTransport(transportOptions);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: EMAIL_SENDER,
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendConfirmationEmail(username: string, userId: string, confirmationCode: string) {
    const confirmationLink = `${SERVER_URI}/api/confirm-email?userId=${userId}&code=${confirmationCode}`;
    const mailOptions = {
      from: EMAIL_SENDER,
      to: username,
      subject: "Conferma la tua email",
      html: registrationEmailTemplate(confirmationLink),
    };
    await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
