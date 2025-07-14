import { Request, Response, NextFunction } from "express";
import { requireEnvVars } from "./dotenv";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const adminName = requireEnvVars("ADMIN_USER_NAME", { throwOnMissing: true });
  if (req.user?.role === adminName) return next();
  return res.status(403).json({ message: "Accesso riservato agli organizzatori" });
}
