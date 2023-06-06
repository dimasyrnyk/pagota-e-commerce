import { Brand, IProduct } from "@constants/products";

export interface ProductsState {
  allProducts: IProduct[];
  selectedProduct: IProduct | null;
  categories: string[];
  brands: Brand[];
  minPrice: number;
  maxPrice: number;
  wishListIds: string[];
  wishListItems: IProduct[];
  isLoading: boolean;
}

export enum ProductsTypes {
  START_LOADING_PRODUCTS = "products/START_LOADING",
  END_LOADING_PRODUCTS = "products/END_LOADING",
  GET_ALL_PRODUCTS = "products/GET_ALL",
  GET_ONE_PRODUCT = "products/GET_ONE",
  ADD_PRODUCT_TO_WISHLIST = "products/ADD_TO_WISHLIST",
  REMOVE_PRODUCT_FROM_WISHLIST = "products/REMOVE_FROM_WISHLIST",
  GET_WISHLIST_PRODUCTS = "products/GET_WISHLIST",
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

interface AddToWishListAction {
  type: ProductsTypes.ADD_PRODUCT_TO_WISHLIST;
  payload: string;
}

interface RemoveFromWishListAction {
  type: ProductsTypes.REMOVE_PRODUCT_FROM_WISHLIST;
  payload: string;
}

interface GetWishListAction {
  type: ProductsTypes.GET_WISHLIST_PRODUCTS;
  payload: IProduct[];
}

export type ProductsAction =
  | StartLoadingAction
  | EndLoadingAction
  | GetAllAction
  | GetOneAction
  | AddToWishListAction
  | RemoveFromWishListAction
  | GetWishListAction;
