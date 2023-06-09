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

export type Discount = {
  percent: number;
  value: number;
};

export const PHONE_REGEX = /^[()\-\+\d]{0,15}$/;
export const ZIP_CODE_REGEX = /^[0-9]{0,5}$/;

export enum Units {
  PCS = "pcs",
  PACK = "pack",
  KG = "kg",
}

export enum Taxes {
  PERCENT = 17,
  COEFFICIENT = 0.17,
}
