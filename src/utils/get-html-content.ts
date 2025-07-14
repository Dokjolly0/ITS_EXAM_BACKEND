import { requireEnvVars } from "./dotenv";

const SERVER_URI = requireEnvVars("SERVER_URI");
export const urlResetPassword = (token: string, userId: string) =>
  `${SERVER_URI}/reset-password-with-email?token=${token}&userId=${userId}`;

export function getHtmlRequestChangePassword(token: string, userId: string) {
  const resetLink = urlResetPassword(token, userId);
  const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #333;">Conferma il reset della password</h2>
            <p>Ciao, per favore conferma il cambio della password cliccando sul pulsante qui sotto:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="background-color: #f48c06; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Conferma il cambio della password</a>
            </div>
            <p>Se non riesci a cliccare il pulsante, clicca il seguente link:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p style="color: #777;">Se non hai richiesto questa registrazione, puoi ignorare questa email.</p>
            <p>Grazie,<br>Il team di MyBanking</p>
        </div>
    `;
  return htmlContent;
}
