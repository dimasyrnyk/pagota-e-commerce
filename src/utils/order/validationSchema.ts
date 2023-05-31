import * as Yup from "yup";

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(20, "Name must be 20 charrccters or less.")
    .required("Name is required"),
  lastName: Yup.string()
    .max(20, "Last name must be 20 charrccters or less.")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(20, "too long"),
  country: Yup.string().required("Is required"),
  city: Yup.string().required("Is required"),
  address: Yup.string()
    .required("Is required")
    .max(25, "Addres must be 25 charrccters or less."),
  postCode: Yup.string()
    .length(5)
    .matches(/^[0-9]{5}/)
    .label("Postal code"),
  additionalInfo: Yup.string(),
  agreementNewsletter: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms"
  ),
  agreementPrivacyPolicy: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms"
  ),
});
