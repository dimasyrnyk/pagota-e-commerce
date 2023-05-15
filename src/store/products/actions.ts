import { BASE_URL } from "@constants/app";
import { AppDispatch } from "..";
import { ProductsTypes } from "../types/products";
import { IProduct } from "@constants/products";
import { getTransformedData } from "@utils/productUtils";

export function getAllProducts() {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ProductsTypes.START_LOADING_PRODUCTS });
    const response = await fetch(BASE_URL);

    const data = await response.json();

    if (!response.ok) {
      alert("Something went wrong");
    } else {
      const transformedData = getTransformedData(data);

      dispatch({
        type: ProductsTypes.GET_ALL_PRODUCTS,
        payload: transformedData,
      });
    }

    dispatch({ type: ProductsTypes.END_LOADING_PRODUCTS });
  };
}
