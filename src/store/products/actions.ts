import { AppDispatch } from "..";
import { ProductsTypes } from "../types/products";

export function getAllProducts() {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ProductsTypes.START_LOADING_PRODUCTS });
    const response = await fetch(
      "https://645b7a19a8f9e4d6e7699f11.mockapi.io/api/products"
    );

    const data = await response.json();

    if (!response.ok) {
      alert("Something went wrong");
    } else {
      dispatch({ type: ProductsTypes.GET_ALL_PRODUCTS, payload: data });
    }

    dispatch({ type: ProductsTypes.END_LOADING_PRODUCTS });
  };
}
