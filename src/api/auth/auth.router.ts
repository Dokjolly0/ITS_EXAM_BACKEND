import express from "express";
import { validate } from "../../utils/validation-middleware";
import { AddUserDTO, LoginDTO } from "./auth.dto";
import { add, handleOAuthAuth, confirmEmail, login } from "./auth.controller";
import { requestPasswordReset, resetPasswordFromEmail, validateResetToken } from "../user/user.controller";
import passport from "passport";

const router = express.Router();

router.post("/login", validate(LoginDTO), login);
router.post("/register", validate(AddUserDTO), add);
router.get("/confirm-email", confirmEmail);
router.post("/request-password-reset", requestPasswordReset); // Richiede reset password
router.get("/validate-reset-token", validateResetToken); // Valida il token ricevuto via mail
router.post("/reset-password-with-email", resetPasswordFromEmail); // Reimposta la password

// Google auth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  handleOAuthAuth
);

// Github OAuth
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  handleOAuthAuth
);

export default router;
