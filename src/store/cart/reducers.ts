import { CartActionType, CartState, CartTypes } from "@store/types/cart";

const initialState: CartState = {
  billingInfo: {
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
  },
  cart: {
    productsShortInfo: [],
    itemCount: 0,
    totalAmount: 0,
    products: [],
    promoCode: [],
  },
  isLoading: false,
};

export default function cartReducer(
  state = initialState,
  action: CartActionType
): CartState {
  switch (action.type) {
    case CartTypes.SET_BILLING_INFO:
      return { ...state, billingInfo: action.payload };
    case CartTypes.RESET_BILLING_INFO:
      return { ...state, billingInfo: initialState.billingInfo };
    default:
      return state;
  }
}
