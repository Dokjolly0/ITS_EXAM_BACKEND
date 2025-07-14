import { Request, Response, NextFunction } from "express";

export class UserExistsError extends Error {
  constructor() {
    super();
    this.name = "UserExists";
    this.message = "username already in use";
  }
}

export const userExistHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UserExistsError) {
    res.status(409).json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
