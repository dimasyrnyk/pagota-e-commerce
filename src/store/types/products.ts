import { IProduct } from "@constants/products";

export interface ProductsState {
  allProducts: IProduct[];
  searchValue: string;
  isLoading: boolean;
}

export enum ProductsTypes {
  START_LOADING_PRODUCTS = "products/START_LOADING",
  END_LOADING_PRODUCTS = "products/END_LOADING",
  GET_ALL_PRODUCTS = "products/GET_ALL",
}

interface StartLoadingAction {
  type: ProductsTypes.START_LOADING_PRODUCTS;
}

interface EndLoadingAction {
  type: ProductsTypes.END_LOADING_PRODUCTS;
}

interface GetAllAction {
  type: ProductsTypes.GET_ALL_PRODUCTS;
  payload: IProduct[];
}

export type ProductsAction =
  | StartLoadingAction
  | EndLoadingAction
  | GetAllAction;