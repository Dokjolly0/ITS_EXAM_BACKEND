import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found";
import { validationErrorHandler } from "./validation";
import { dotenvHandler } from "./dotenv";
import { emptyStringHandler } from "./empty-string";
import { invalidArgumentTypeHandler } from "./invalid-argument-type";
import { unauthorizedHandler } from "./unoutorized-error";
import { userExistHandler } from "./user-exists";
import { customHandler } from "./custom-error";
import { badRequestHandler } from "./bad-request-error";

export const errorHandlers = [
  unauthorizedHandler,
  notFoundHandler,
  validationErrorHandler,
  userExistHandler,
  badRequestHandler,
  customHandler,
  dotenvHandler,
  emptyStringHandler,
  invalidArgumentTypeHandler,
  genericHandler,
];
