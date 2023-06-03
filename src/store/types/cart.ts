import { IFormValues } from "@constants/cart";
import { IProduct } from "@constants/products";

export interface IProductDTO {
  id: string;
  item: IProduct;
  quantity: {
    unit: string;
    amount: number;
  };
}

export interface IPromoCode {
  promoCode: string;
  discount: number;
}

export interface ICart {
  products: IProductDTO[];
  totalPrice: number;
  promoCode: IPromoCode[];
}

export interface CartState {
  billingInfo: IFormValues;
  cart: ICart;
  order: string;
  isLoading: boolean;
}

export enum CartTypes {
  SET_BILLING_INFO = "cart/SET_BILLING_INFO",
  UPDATE_BILLING_INFO = "cart/UPDATE_BILLING_INFO",
  RESET_BILLING_INFO = "cart/RESET_BILLING_INFO",
  GET_CART_PRODUCTS = "cart/GET_PRODUCTS",
  START_LOADING_PRODUCTS = "cart/START_LOADING_PRODUCTS",
  END_LOADING_PRODUCTS = "cart/END_LOADING_PRODUCTS",
  SET_TOTAL_PRICE = "cart/SET_TOTAL_PRICE",
  ADD_PRODUCT_TO_CART = "cart/ADD_PRODUCT",
  UPDATE_PRODUCT_IN_CART = "cart/UPDATE_PRODUCT_IN_CART",
  CHANGE_PRODUCT_UNIT = "cart/CHANGE_PRODUCT_UNIT",
  REMOVE_PRODUCT_FROM_CART = "cart/REMOVE_PRODUCT",
  RESET_PRODUCT_CART = "cart/RESET",
  CREATE_ORDER = "cart/CREATE_ORDER",
  DELETE_ORDER = "cart/DELETE_ORDER",
}

interface SetBillingInfoAction {
  type: CartTypes.SET_BILLING_INFO;
  payload: IFormValues;
}

interface UpdateBillingInfoAction {
  type: CartTypes.UPDATE_BILLING_INFO;
  payload: { [key: string]: string };
}

interface ResetBillingInfoAction {
  type: CartTypes.RESET_BILLING_INFO;
}

interface GetCartProductsAction {
  type: CartTypes.GET_CART_PRODUCTS;
  payload: IProductDTO[];
}

interface StartLoadingAction {
  type: CartTypes.START_LOADING_PRODUCTS;
}

interface EndLoadingAction {
  type: CartTypes.END_LOADING_PRODUCTS;
}

interface SetTotalPriceAction {
  type: CartTypes.SET_TOTAL_PRICE;
  payload: number;
}

interface AddProductAction {
  type: CartTypes.ADD_PRODUCT_TO_CART;
  payload: IProductDTO;
}

interface UpdateProductAction {
  type: CartTypes.UPDATE_PRODUCT_IN_CART;
  payload: IProductDTO;
}

interface ChangeProductUnitAction {
  type: CartTypes.CHANGE_PRODUCT_UNIT;
  payload: { product: IProductDTO; unit: string };
}

interface RemoveProductAction {
  type: CartTypes.REMOVE_PRODUCT_FROM_CART;
  payload: IProductDTO;
}

interface ResetProductsAction {
  type: CartTypes.RESET_PRODUCT_CART;
}

interface CreateOrderAction {
  type: CartTypes.CREATE_ORDER;
  payload: string;
}

interface DeleteOrderAction {
  type: CartTypes.DELETE_ORDER;
}

export type CartActionType =
  | SetBillingInfoAction
  | UpdateBillingInfoAction
  | ResetBillingInfoAction
  | GetCartProductsAction
  | StartLoadingAction
  | EndLoadingAction
  | SetTotalPriceAction
  | AddProductAction
  | UpdateProductAction
  | ChangeProductUnitAction
  | RemoveProductAction
  | ResetProductsAction
  | CreateOrderAction
  | DeleteOrderAction;
