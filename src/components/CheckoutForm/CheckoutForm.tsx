import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useFormik, FormikProvider } from "formik";
import { Country, City } from "country-state-city";
import { ICity } from "country-state-city";

import "./CheckoutForm.scss";
import { AppDispatch, RootState } from "@store/index";
import { IFormValues, ISelectOption } from "@constants/cart";
import { validationSchema } from "@utils/order/validationSchema";
import Confirmation from "./Confirmation/Confirmation";
import BillingInfo from "./BillingInfo/BillingInfo";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import { resetBillingInfo, setBillingInfo } from "@store/cart/actions";

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

function CheckoutForm() {
  const dispatch: AppDispatch = useDispatch();
  const billingInfo = useSelector((state: RootState) => state.cart.billingInfo);

  const onSubmit = (values: IFormValues) => {
    console.log(values);
    formik.setValues(initialValues);
    dispatch(resetBillingInfo());
  };

  const formik = useFormik<IFormValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    validateOnChange: true,
  });
  const [cities, setCities] = useState<ISelectOption[]>([]);
  const isFormValid = formik.dirty && !formik.isSubmitting && formik.isValid;
  const { values } = formik;
  const selectedCountry = values.country;
  const countries: ISelectOption[] = Country.getAllCountries().map(
    (country) => ({
      value: country.isoCode,
      label: country.name,
    })
  );

  useEffect(() => {
    formik.setValues(billingInfo);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const newCities: ISelectOption[] =
        City.getCitiesOfCountry(selectedCountry)?.map((city: ICity) => ({
          value: city.name,
          label: city.name,
        })) || [];
      setCities(newCities);
    }
  }, [selectedCountry]);

  const handleBlur = () => {
    dispatch(setBillingInfo(values));
  };

  return (
    <div className="checkout-form__container">
      <FormikProvider value={formik}>
        <Form className="checkout-form">
          <BillingInfo
            countries={countries}
            cities={cities}
            isCitiesDisabled={!values.country}
            onBlur={handleBlur}
          />
          <AdditionalInfo />
          <Confirmation isFormValid={isFormValid} />
        </Form>
      </FormikProvider>
    </div>
  );
}

export default CheckoutForm;
