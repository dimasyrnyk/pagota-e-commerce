import "./BillingInfo.scss";
import { ISelectOption, PHONE_REGEX, ZIP_CODE_REGEX } from "@constants/cart";
import FormInput from "./../FormElements/FormInput";
import FormInputNumber from "./../FormElements/FormInputNumber";
import FormSelect from "./../FormElements/FormSelect";

type Props = {
  countries: ISelectOption[];
  cities: ISelectOption[];
  isCitiesDisabled: boolean;
  onBlur: (object: { [key: string]: string }) => void;
};

function BillingInfo({ countries, cities, isCitiesDisabled, onBlur }: Props) {
  return (
    <div className="billing-info__container">
      <div className="checkout-form__header-section">
        <h2>Billing info</h2>
        <span>Please enter your billing info</span>
      </div>
      <FormInput
        name="firstName"
        label="First Name"
        onBlur={onBlur}
      />
      <FormInput
        name="lastName"
        label="Last Name"
        onBlur={onBlur}
      />
      <FormInput
        name="email"
        label="Email address"
        type="email"
        onBlur={onBlur}
      />
      <FormInputNumber
        name="phoneNumber"
        label="Phone number"
        regex={PHONE_REGEX}
        onBlur={onBlur}
      />
      <FormSelect
        name="country"
        title="State / Country"
        options={countries}
        placeholder="Choose a Country"
        onBlur={onBlur}
        isRequired
      />
      <FormSelect
        name="city"
        title="Town / City"
        options={cities}
        placeholder="Town or city"
        disabled={isCitiesDisabled}
        onBlur={onBlur}
      />
      <FormInput
        name="address"
        label="Address"
        onBlur={onBlur}
      />
      <FormInputNumber
        name="postCode"
        label="ZIP/Postal code"
        placeholder="Postal code or ZIP"
        regex={ZIP_CODE_REGEX}
        onBlur={onBlur}
      />
    </div>
  );
}

export default BillingInfo;
