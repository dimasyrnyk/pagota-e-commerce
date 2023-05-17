import { Brand, IProduct } from "@constants/products";

export interface ProductsState {
  allProducts: IProduct[];
  categories: string[];
  brands: Brand[];
  minPrice: number;
  maxPrice: number;
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
  payload: {
    products: IProduct[];
    categories: string[];
    brands: Brand[];
    minPrice: number;
    maxPrice: number;
  };
}

export type ProductsAction =
  | StartLoadingAction
  | EndLoadingAction
  | GetAllAction;
