import { Brand, IProduct } from "@constants/products";

export interface ProductsState {
  allProducts: IProduct[];
  selectedProduct: IProduct | null;
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
  GET_ONE_PRODUCT = "products/GET_ONE",
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

interface GetOneAction {
  type: ProductsTypes.GET_ONE_PRODUCT;
  payload: IProduct;
}

export type ProductsAction =
  | StartLoadingAction
  | EndLoadingAction
  | GetAllAction
  | GetOneAction;
