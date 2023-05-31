import * as Yup from "yup";

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
const postCodeRegExp = /^[0-9]{5}/;

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(5, "Name must be from 5 to 20 charracters.")
    .max(20, "Name must be 20 charracters or less.")
    .required("Name is required"),
  lastName: Yup.string()
    .max(20, "Last name must be 20 charrscters or less.")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Must be 10 numbers or more")
    .max(20, "Too long"),
  country: Yup.string().required("Is required"),
  city: Yup.string(),
  address: Yup.string()
    .required("Is required")
    .max(25, "Addres must be 25 charracters or less."),
  postCode: Yup.string()
    .required("Is required")
    .matches(postCodeRegExp, "Must be 5 numbers")
    .min(5)
    .max(5),
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
