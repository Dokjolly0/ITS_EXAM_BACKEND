import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserIdentityModel } from "./user-identity.model";
import * as bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      try {
        const identity = await UserIdentityModel.findOne({
          "credentials.username": username,
        });
        if (!identity) {
          return done(null, false, {
            message: `username ${username} not found`,
          });
        }
        const match = await bcrypt.compare(password, identity.credentials.hashedPassword);
        if (match) {
          return done(null, identity.toObject().user);
        }
        done(null, false, { message: "invalid password" });
      } catch (err) {
        done(err);
      }
    }
  )
);

export function isValidResendEmail(lastSent: Date) {
  const now = new Date();
  const oneHour = 1000 * 60 * 60;

  if (!lastSent || now.getTime() - new Date(lastSent).getTime() > oneHour) {
    return true;
  }
  return false;
}
