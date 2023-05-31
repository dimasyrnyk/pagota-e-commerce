import { IFormValues } from "@constants/cart";
import { CartTypes } from "@store/types/cart";

export const setBillingInfo = (info: IFormValues) => ({
  type: CartTypes.SET_BILLING_INFO,
  payload: info,
});

export const resetBillingInfo = () => ({
  type: CartTypes.RESET_BILLING_INFO,
});
