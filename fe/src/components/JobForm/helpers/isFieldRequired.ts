import { AnyObjectSchema } from "yup";

export const isFieldRequired = (
  validationSchema: AnyObjectSchema,
  fieldName: string
): boolean => {
  const fieldProperties = validationSchema.describe().fields[fieldName];
  if (fieldProperties && "optional" in fieldProperties) {
    return !fieldProperties.optional;
  }
  return false;
};
