import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  statusCode: number;

  constructor(
    name: string = "CustomError",
    message: string = "Custom error message",
    statusCode: number = 400
  ) {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const customHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
