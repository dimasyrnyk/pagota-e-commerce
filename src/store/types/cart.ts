import { IFormValues } from "@constants/cart";
import { IProduct } from "@constants/products";

interface shortProductDTO {
  id: string;
  quantity: {
    units: string;
    amount: number;
  };
}

interface fullProductDTO {
  item: IProduct;
  quantity: {
    units: string;
    amount: number;
  };
  totalPrice: number;
}

export interface CartState {
  billingInfo: IFormValues;
  cart: {
    productsShortInfo: shortProductDTO[];
    itemCount: number;
    totalAmount: number;
    products: fullProductDTO[];
    promoCode: string[];
  };
  isLoading: boolean;
}

export enum CartTypes {
  SET_BILLING_INFO = "cart/SET_BILLING_INFO",
  RESET_BILLING_INFO = "cart/RESET_BILLING_INFO",
}

interface SetBillingInfoAction {
  type: CartTypes.SET_BILLING_INFO;
  payload: IFormValues;
}

interface ResetBillingInfoAction {
  type: CartTypes.RESET_BILLING_INFO;
}

export type CartActionType = SetBillingInfoAction | ResetBillingInfoAction;
