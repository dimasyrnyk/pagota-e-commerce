import {
  ProductsState,
  ProductsTypes,
  ProductsAction,
} from "../types/products";
import { ALL_CATEGORIES } from "@constants/app";

const initialState: ProductsState = {
  allProducts: [],
  categories: [ALL_CATEGORIES],
  brands: [],
  minPrice: 0,
  maxPrice: 0,
  isLoading: false,
};

export default function productsReducer(
  state = initialState,
  action: ProductsAction
): ProductsState {
  switch (action.type) {
    case ProductsTypes.START_LOADING_PRODUCTS:
      return { ...state, isLoading: true };
    case ProductsTypes.END_LOADING_PRODUCTS:
      return { ...state, isLoading: false };
    case ProductsTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload.products,
        categories: initialState.categories.concat(action.payload.categories),
        brands: action.payload.brands,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
      };
    default:
      return state;
  }
}
