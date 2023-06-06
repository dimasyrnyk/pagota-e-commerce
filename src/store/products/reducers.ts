import {
  ProductsState,
  ProductsTypes,
  ProductsAction,
} from "../types/products";
import { ALL_CATEGORIES } from "@constants/app";

const initialState: ProductsState = {
  allProducts: [],
  selectedProduct: null,
  categories: [ALL_CATEGORIES],
  brands: [],
  minPrice: 0,
  maxPrice: 0,
  wishListIds: [],
  wishListItems: [],
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
    case ProductsTypes.GET_ONE_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case ProductsTypes.ADD_PRODUCT_TO_WISHLIST:
      return { ...state, wishListIds: [...state.wishListIds, action.payload] };
    case ProductsTypes.REMOVE_PRODUCT_FROM_WISHLIST:
      return {
        ...state,
        wishListIds: state.wishListIds.filter((id) => id !== action.payload),
        wishListItems: state.wishListItems.filter(
          (p) => p.id !== action.payload
        ),
      };
    case ProductsTypes.GET_WISHLIST_PRODUCTS:
      return { ...state, wishListItems: action.payload };
    default:
      return state;
  }
}
