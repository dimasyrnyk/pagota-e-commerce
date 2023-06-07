import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useFormik, FormikProvider } from "formik";
import { Country, City } from "country-state-city";
import { ICity } from "country-state-city";
import { v4 as uuidv4 } from "uuid";

import "./CheckoutForm.scss";
import { AppDispatch, RootState } from "@store/index";
import { IFormValues, ISelectOption } from "@constants/cart";
import { validationSchema } from "@utils/order/validationSchema";
import Confirmation from "./Confirmation/Confirmation";
import BillingInfo from "./BillingInfo/BillingInfo";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import {
  createOrderInCart,
  resetBillingInfo,
  resetProductCart,
  updateBillingInfo,
} from "@store/cart/actions";

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
  const user = useSelector((state: RootState) => state.auth.user);

  const onSubmit = () => {
    formik.setValues(initialValues);
    dispatch(resetBillingInfo());
    dispatch(resetProductCart());
    const orderNumber = uuidv4();
    dispatch(createOrderInCart(orderNumber));
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
    const newBillingInfo = { ...billingInfo };

    if (user) {
      newBillingInfo.firstName = user.given_name;
      newBillingInfo.lastName = user.family_name;
      newBillingInfo.email = user.email;
    }

    formik.setValues(newBillingInfo);
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

  const handleBlur = (info: { [key: string]: string }) => {
    dispatch(updateBillingInfo(info));
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
          <AdditionalInfo onBlur={handleBlur} />
          <Confirmation isFormValid={isFormValid} />
        </Form>
      </FormikProvider>
    </div>
  );
}

export default CheckoutForm;
