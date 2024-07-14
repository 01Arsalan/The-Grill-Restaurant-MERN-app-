import * as Yup from "yup";

export const phoneValidationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});