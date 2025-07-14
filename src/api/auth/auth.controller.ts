import "dotenv/config";

import * as jwt from "jsonwebtoken";

import { NextFunction, Response } from "express";
import { omit, pick } from "lodash";

import { AddUserDTO } from "./auth.dto";
import { CustomError } from "../../errors/custom-error";
import { TypedRequest } from "../../utils/typed-request";
import { UserModel } from "../user/user.model";
import { getClientIP } from "../../utils/fetch-ip";
import passport from "passport";
import { requireEnvVars } from "../../utils/dotenv";
import userService from "../user/user.service";

const [JWT_SECRET, EXPIRED_IN_JWT, FRONTEND_URL] = requireEnvVars([
  "JWT_SECRET",
  "EXPIRED_IN_JWT",
  "FRONTEND_URL",
]);

export const login = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const authMiddleware = passport.authenticate("local", async (err, user, info) => {
      if (err) {
        next(err);
        return;
      }

      if (!user) {
        res.status(401);
        res.json({
          error: "LoginError",
          message: info.message,
        });
        return;
      }

      const identity = await userService.getUserIdentityByUserId(user.id);

      if (identity && !identity.isActive) {
        res.status(400).json({
          error: "LoginError",
          message: "Account non attivato. Controlla la tua casella mail per confermare la registrazione.",
        });
        return;
      }

      const userTmp = await UserModel.findById(user.id);
      const ip: string | undefined = getClientIP(req);
      if (userTmp) {
        if (ip && userTmp.allowedIps && !userTmp.allowedIps.includes(ip)) {
          userTmp.allowedIps.push(ip);
        }
        userTmp.lastLogin = new Date();
        userTmp.lastUpdateAt = new Date();
        userTmp.lastAllowedIp = ip;
        await userTmp.save();
      }

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRED_IN_JWT });

      res.status(200);
      res.json({
        user,
        token,
      });
    });

    authMiddleware(req, res, next);
  } catch (e) {
    next(e);
  }
};

export const add = async (req: TypedRequest<AddUserDTO>, res: Response, next: NextFunction) => {
  try {
    const userBody = omit(req.body, "username", "password");
    const credentials = pick(req.body, "username", "password");

    const newUser = await userService.add(userBody, credentials, req);
    const identity = await userService.getUserIdentityByUserId(newUser.id!);

    let message = "User register succesfully.";
    if (identity && !identity.isActive) {
      message = "User add succesfully, please check the email and confirm the email verification.";
    }

    res.status(201).json({ newUser, message });
  } catch (err: any) {
    next(err);
  }
};

export const handleOAuthAuth = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    const identity = await userService.getUserIdentityByUserId(user.id);

    if (identity && !identity.isActive) {
      throw new CustomError(
        "EmailConfirmationRequired",
        "Per favore conferma la tua email prima di accedere.",
        401
      );
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: EXPIRED_IN_JWT,
    });

    // Reindirizza il frontend con il token
    res.redirect(`${FRONTEND_URL}/login-success?token=${token}`);
  } catch (err: any) {
    next(err);
  }
};

export const confirmEmail = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const { userId, code } = req.query;

    const isConfirmed = await userService.verifyConfirmationToken(userId as string, code as string);

    if (isConfirmed) {
      //res.redirect(process.env.API_URL + "/confirm-email-success");
      res.status(200).json({ message: "Mail confermata, account attivato." });
    } else {
      //res.redirect(process.env.API_URL + "/confirm-email-failure");
      res.status(400).json({ message: "Codice di conferma non valido." });
    }
  } catch (error) {
    next(error);
  }
};
