import { ProductsState } from "../types/products";

const initialState: ProductsState = {
  allProducts: [],
  searchValue: "",
};

export default function productsReducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
