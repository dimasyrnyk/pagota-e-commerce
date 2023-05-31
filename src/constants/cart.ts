export interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  postCode: string;
  additionalInfo: string;
  agreementNewsletter: boolean;
  agreementPrivacyPolicy: boolean;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export const PHONE_REGEX = /^[()\-\+\d]{0,20}$/;
export const ZIP_CODE_REGEX = /^[0-9]{0,5}$/;
