import { CartActionType, CartState, CartTypes, ICart } from "@store/types/cart";
import {
  getCartWithUpdatedProduct,
  getCartWithoutRemovedProducts,
} from "@utils/order/getters";

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
    products: [],
    totalPrice: 0,
    promoCode: [
      {
        promoCode: "SUMMER",
        discount: 10,
      },
    ],
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
    case CartTypes.UPDATE_BILLING_INFO:
      return {
        ...state,
        billingInfo: { ...state.billingInfo, ...action.payload },
      };
    case CartTypes.RESET_BILLING_INFO:
      return { ...state, billingInfo: initialState.billingInfo };
    case CartTypes.GET_CART_PRODUCTS:
      return { ...state, cart: { ...state.cart, products: action.payload } };
    case CartTypes.START_LOADING_PRODUCTS:
      return { ...state, isLoading: true };
    case CartTypes.END_LOADING_PRODUCTS:
      return { ...state, isLoading: false };
    case CartTypes.SET_TOTAL_PRICE:
      return { ...state, cart: { ...state.cart, totalPrice: action.payload } };
    case CartTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [action.payload, ...state.cart.products],
        },
      };
    case CartTypes.UPDATE_PRODUCT_IN_CART:
      const updatedCart: ICart = getCartWithUpdatedProduct(
        state.cart,
        action.payload
      );
      return { ...state, cart: updatedCart };
    case CartTypes.CHANGE_PRODUCT_UNIT:
      const newCart: ICart = getCartWithUpdatedProduct(
        state.cart,
        action.payload.product,
        action.payload.unit
      );
      return { ...state, cart: newCart };
    case CartTypes.REMOVE_PRODUCT_FROM_CART:
      const cart: ICart = getCartWithoutRemovedProducts(
        state.cart,
        action.payload
      );
      return { ...state, cart: cart };
    default:
      return state;
  }
}
