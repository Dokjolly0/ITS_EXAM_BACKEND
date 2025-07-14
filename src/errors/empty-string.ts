import { Request, Response, NextFunction } from "express";

export class EmptyStringError extends Error {
  fields: string[];

  constructor(fields: string[] | string = []) {
    const fieldsArray = Array.isArray(fields) ? fields : [fields];
    super(`Empty string found in fields: ${fieldsArray.join(", ")}`);
    this.name = "EmptyStringError";
    this.fields = fieldsArray;
  }
}

export const emptyStringHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof EmptyStringError) {
    res.status(400).json({
      error: err.name,
      message: err.message,
      emptyFields: err.fields,
    });
  } else {
    next(err);
  }
};
