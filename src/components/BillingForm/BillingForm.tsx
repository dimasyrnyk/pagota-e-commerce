import { useEffect, useState } from "react";
import { Form, useFormik, FormikProvider } from "formik";
import { Country, City } from "country-state-city";
import { ICity } from "country-state-city";

import "./BillingForm.scss";
import { IFormValues, ISelectOption } from "@constants/app";
import { validationSchema } from "@utils/order/validationSchema";
import FormInput from "./FormElements/FormInput";
import FormTextArea from "./FormElements/FormTextArea";
import FormSelect from "./FormElements/FormSelect";
import FormConfirmation from "./FormConfirmation";

const initialValues: IFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  country: "",
  city: "",
  address: "",
  postCode: "",
  additionalInfo: "",
  agreementNewsletter: false,
  agreementPrivacyPolicy: false,
};

const onSubmit = (values: IFormValues) => {
  console.log(values);
};

function BillingInfo() {
  const formik = useFormik<IFormValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  const isFormValid = formik.dirty && !formik.isSubmitting && formik.isValid;
  const { values } = formik;
  const [cities, setCities] = useState<ISelectOption[]>([]);
  const selectedCountry = values.country;
  const countries: ISelectOption[] = Country.getAllCountries().map(
    (country) => ({
      value: country.isoCode,
      label: country.name,
    })
  );

  useEffect(() => {
    if (selectedCountry) {
      const newCities: ISelectOption[] =
        City.getCitiesOfCountry(selectedCountry)?.map((city: ICity) => ({
          value: city.name,
          label: city.name,
        })) || [];
      setCities(newCities);
    } else {
      setCities([]);
      formik.setFieldValue("city", "");
    }
  }, [selectedCountry]);

  return (
    <div className="billing-form__container">
      <FormikProvider value={formik}>
        <Form className="billing-form">
          <div className="billing-form__section-header">
            <h1>Billing info</h1>
            <span>Please enter your billing info</span>
          </div>
          <FormInput
            name="firstName"
            title="First Name"
          />
          <FormInput
            name="lastName"
            title="Last Name"
          />
          <FormInput
            name="email"
            title="Email address"
            type="email"
          />
          <FormInput
            name="phoneNumber"
            title="Phone number"
            type="tel"
          />
          <FormSelect
            name="country"
            title="State / Country"
            options={countries}
            placeholder="Choose a Country"
          />
          <FormSelect
            name="city"
            title="Town / City"
            options={cities}
            placeholder="Town or city"
            disabled={!values.country}
          />
          <FormInput
            name="address"
            title="Address"
          />
          <FormInput
            name="postCode"
            title="ZIP/Postal code"
            type="text"
            placeholder="Postal code or ZIP"
          />

          <div className="billing-form__section-header">
            <h2>Additional informations</h2>
            <span>Need something else? We will make it for you!</span>
          </div>
          <FormTextArea name="additionalInfo" />

          <FormConfirmation isFormValid={isFormValid} />
        </Form>
      </FormikProvider>
    </div>
  );
}

export default BillingInfo;
