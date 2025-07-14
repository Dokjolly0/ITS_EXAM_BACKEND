import { Request, Response, NextFunction } from "express";

export class DotEnvError extends Error {
  constructor(entity?: string) {
    super("Entity not found in dotenv");
    this.name = "DotEnvError";
    this.message = `Entity ${entity} not found in dotenv`;
  }
}

export const dotenvHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DotEnvError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
