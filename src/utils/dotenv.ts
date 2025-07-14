import "dotenv/config"; // Load environment variables from .env file
import { CustomError } from "../errors/custom-error";
import { DotEnvError } from "../errors/dotenv";

interface RequireEnvOptions {
  throwOnMissing?: boolean;
}

// OVERLOADS
export function requireEnvVars(field: string): string;
export function requireEnvVars(field: string, options: { throwOnMissing: false }): string | undefined;
export function requireEnvVars(field: string, options?: RequireEnvOptions): string;

export function requireEnvVars(fields: string[]): string[];
export function requireEnvVars(fields: string[], options: { throwOnMissing: false }): (string | undefined)[];
export function requireEnvVars(fields: string[], options?: RequireEnvOptions): string[];

// IMPLEMENTAZIONE UNICA
export function requireEnvVars(
  fields: string | string[],
  options: RequireEnvOptions = { throwOnMissing: true }
): unknown {
  const { throwOnMissing } = options;

  const isMissing = (key: string): boolean =>
    typeof process.env[key] !== "string" || process.env[key]?.trim() === "";

  const getValue = (key: string): string | undefined => {
    if (isMissing(key)) {
      if (throwOnMissing) throw new DotEnvError(key);
      return undefined;
    }
    return process.env[key]!.trim();
  };

  if (typeof fields === "string") {
    return getValue(fields);
  }

  if (Array.isArray(fields)) {
    return fields.map((key) => {
      if (typeof key !== "string" || key.trim() === "") {
        if (throwOnMissing) throw new DotEnvError(key);
        return undefined;
      }
      return getValue(key);
    });
  }

  throw new CustomError(
    "Invalid argument",
    `Expected a string or an array of strings, but received: ${typeof fields}`,
    400
  );
}

export const notThrowDotEnvError: RequireEnvOptions = {
  throwOnMissing: false,
};
