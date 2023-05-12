import { IProduct } from "@constants/products";
import {
  ProductsState,
  ProductsTypes,
  ProductsAction,
} from "../types/products";
import { ALL_CATEGORIES } from "@constants/categories";

interface ICategories {
  [key: string]: boolean;
}

const initialState: ProductsState = {
  allProducts: [],
  categories: [ALL_CATEGORIES],
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
      const uniqueCategories = action.payload.reduce(
        (accumulator: ICategories, product: IProduct) => {
          accumulator[product.category] = true;
          return accumulator;
        },
        {}
      );
      const categories = Object.keys(uniqueCategories);
      return {
        ...state,
        allProducts: action.payload,
        categories: initialState.categories.concat(categories),
      };
    default:
      return state;
  }
}
