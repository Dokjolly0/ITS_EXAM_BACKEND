import { User } from "../api/user/user.entity";
import { CustomError } from "../errors/custom-error";

export type FieldsInput =
  | { name: string; value: unknown }[]
  | Record<string, unknown>;

export const verifyEmptyField = (
  fields: FieldsInput,
  ErrorClass?: new (fields: string[]) => Error
): string[] => {
  let normalizedFields: { name: string; value: unknown }[];

  if (Array.isArray(fields)) {
    normalizedFields = fields;
  } else {
    normalizedFields = Object.keys(fields).map((key) => ({
      name: key,
      value: fields[key],
    }));
  }

  const emptyFields: string[] = [];

  for (const field of normalizedFields) {
    // Controlla se il valore è null/undefined oppure stringa vuota
    if (
      field.value === null ||
      field.value === undefined ||
      (typeof field.value === "string" && field.value.trim() === "")
    ) {
      emptyFields.push(field.name);
    }
  }

  // Se ci sono campi vuoti e la classe di errore è fornita, lancia l'errore
  if (emptyFields.length > 0 && ErrorClass) {
    throw new ErrorClass(emptyFields);
  }

  return emptyFields;
};

export function validateNameField(name, fieldName) {
  if (name && name.includes(" ")) {
    throw new CustomError(
      "InvalidNameError",
      `The ${fieldName} '${name}' must not contain spaces.`,
      400
    );
  }
}