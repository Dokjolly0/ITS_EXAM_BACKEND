import { Request, Response, NextFunction } from "express";

export class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.name = "BadRequestError";
  }
}

export const badRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) {
    res.status(400).json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
