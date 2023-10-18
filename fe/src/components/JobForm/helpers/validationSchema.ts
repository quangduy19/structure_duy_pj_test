import * as yup from "yup";

export const validationSchema: any = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  expiryDate: yup.date().required("Expiry Date is required"),
});
