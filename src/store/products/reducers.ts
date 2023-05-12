import {
  ProductsState,
  ProductsTypes,
  ProductsAction,
} from "../types/products";

const initialState: ProductsState = {
  allProducts: [],
  searchValue: "",
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
      return { ...state, allProducts: action.payload };
    default:
      return state;
  }
}
