import { BASE_URL } from "@constants/app";
import { AppDispatch } from "..";
import { ProductsAction, ProductsTypes } from "../types/products";
import { getTransformedData } from "@utils/products/transformData";
import { setFilterPrices } from "@store/filters/actions";
import { IProduct } from "@constants/products";

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
      dispatch(
        setFilterPrices({
          min: transformedData.minPrice,
          max: transformedData.maxPrice,
        })
      );
    }

    dispatch({ type: ProductsTypes.END_LOADING_PRODUCTS });
  };
}

export function getOneProduct(productId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ProductsTypes.START_LOADING_PRODUCTS });
    const response = await fetch(BASE_URL + `/${productId}`);

    const data = await response.json();

    if (!response.ok) {
      alert("Something went wrong");
    } else {
      dispatch({
        type: ProductsTypes.GET_ONE_PRODUCT,
        payload: data,
      });
    }

    dispatch({ type: ProductsTypes.END_LOADING_PRODUCTS });
  };
}

export const addProductToWishlist = (productId: string): ProductsAction => ({
  type: ProductsTypes.ADD_PRODUCT_TO_WISHLIST,
  payload: productId,
});

export const removeProductFromWishlist = (
  productId: string
): ProductsAction => ({
  type: ProductsTypes.REMOVE_PRODUCT_FROM_WISHLIST,
  payload: productId,
});

export function getWishListCartProducts(productsIds: string[]) {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ProductsTypes.START_LOADING_PRODUCTS });

    const products: IProduct[] = await productsIds.reduce(
      async (accPromise, id) => {
        const acc = await accPromise;
        const response = await fetch(BASE_URL + `/${id}`);
        const data: IProduct = await response.json();
        if (response.ok) {
          return [...acc, data];
        }
        return acc;
      },
      Promise.resolve([] as IProduct[])
    );

    dispatch({ type: ProductsTypes.GET_WISHLIST_PRODUCTS, payload: products });

    dispatch({ type: ProductsTypes.END_LOADING_PRODUCTS });
  };
}
