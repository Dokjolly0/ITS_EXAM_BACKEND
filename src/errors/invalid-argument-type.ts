import { Request, Response, NextFunction } from "express";

export class InvalidArgumentTypeError extends Error {
  argumentExpected: string;
  argumentReceived: string;

  constructor(argumentExpected: string, argumentReceived: string) {
    super(
      `Invalid argument type. Expected ${argumentExpected}, but received ${argumentReceived}`
    );
    this.name = "EmptyStringError";
    this.argumentExpected = argumentExpected;
    this.argumentReceived = argumentReceived;
  }
}

export const invalidArgumentTypeHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof InvalidArgumentTypeError) {
    res.status(400).json({
      error: "InvalidArgumentTypeError",
      message: err.message,
      argumentExpected: err.argumentExpected,
      argumentReceived: err.argumentReceived,
    });
  } else {
    next(err);
  }
};
