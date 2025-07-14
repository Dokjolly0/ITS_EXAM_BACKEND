import { BadRequestError } from "../../../errors/bad-request-error";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request } from "express";
import { UserIdentityModel } from "../local/user-identity.model";
import { UserModel } from "../../../api/user/user.model";
import { emailService } from "../../services/email.service";
import { getClientIP } from "../../fetch-ip";
import { isValidResendEmail } from "../local/local-strategy";
import passport from "passport";
import { requireEnvVars } from "../../dotenv";
import { v4 as uuidv4 } from "uuid";

const [GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL] = requireEnvVars([
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
]);

const IS_REQUIRED_EMAIL_VERIFICATION = requireEnvVars("IS_REQUIRED_EMAIL_VERIFICATION") === "true";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // <--- AGGIUNGI QUESTO
    },
    async (req: Request, _accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email) return done(new BadRequestError("Missing email from Google profile"), null);
        const ip = getClientIP(req);
        const allowedIps = ip ? [ip] : [];
        const isActive = !IS_REQUIRED_EMAIL_VERIFICATION;

        let user;
        let userIdentity = await UserIdentityModel.findOne({ "credentials.username": email });
        const confirmationToken = uuidv4();

        if (!userIdentity) {
          // Crea utente e userIdentity
          const fullName = profile.displayName || "";
          const [firstName, ...rest] = fullName.trim().split(" ");
          const lastName = rest.join(" ") || "";

          user = await UserModel.create({
            username: email,
            firstName: firstName || "",
            lastName: lastName || "",
            picture: profile.photos?.[0]?.value,
            lastAllowedIp: ip,
            allowedIps,
            role: "user",
          });

          userIdentity = await UserIdentityModel.create({
            provider: "google",
            user: user._id,
            credentials: {
              username: email,
              hashedPassword: uuidv4(),
            },
            isActive,
            confirmationToken,
            emailConfirmationSentAt: isActive ? null : new Date(),
          });

          if (!isActive) {
            await emailService.sendConfirmationEmail(email, user.id!, confirmationToken);
          }
        } else {
          user = userIdentity.user;

          if (!userIdentity.isActive && userIdentity.emailConfirmationSentAt) {
            const shouldResend = isValidResendEmail(userIdentity.emailConfirmationSentAt);
            if (shouldResend) {
              await emailService.sendConfirmationEmail(email, user.id!, confirmationToken);
              userIdentity.emailConfirmationSentAt = new Date();
              await userIdentity.save();
            }
          }
        }

        return done(null, user.toObject());
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
