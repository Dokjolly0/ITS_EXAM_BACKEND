import { Request, Response, NextFunction } from "express";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.message = "User not autorized";
  }
}

export const unauthorizedHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UnauthorizedError) {
    res.status(401);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
