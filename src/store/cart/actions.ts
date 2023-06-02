import { BASE_URL } from "@constants/app";
import { IFormValues } from "@constants/cart";
import { CartTypes, IProductDTO } from "@store/types/cart";
import { AppDispatch } from "..";
import { IProduct } from "@constants/products";

export const setBillingInfo = (info: IFormValues) => ({
  type: CartTypes.SET_BILLING_INFO,
  payload: info,
});

export const updateBillingInfo = (info: { [key: string]: string }) => ({
  type: CartTypes.UPDATE_BILLING_INFO,
  payload: info,
});

export const resetBillingInfo = () => ({
  type: CartTypes.RESET_BILLING_INFO,
});

export function getCartProducts(products: IProductDTO[]) {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: CartTypes.START_LOADING_PRODUCTS });

    const updatedProducts: IProductDTO[] = await products.reduce(
      async (accPromise, product) => {
        const acc = await accPromise;
        const response = await fetch(BASE_URL + `/${product.id}`);
        const data: IProduct = await response.json();
        if (response.ok) {
          return [...acc, { ...product, item: data }];
        }
        return acc;
      },
      Promise.resolve([] as IProductDTO[])
    );

    dispatch({ type: CartTypes.GET_CART_PRODUCTS, payload: updatedProducts });

    dispatch({ type: CartTypes.END_LOADING_PRODUCTS });
  };
}

export const setTotlaPrice = (totalPrice: number) => ({
  type: CartTypes.SET_TOTAL_PRICE,
  payload: totalPrice,
});

export const addProductToCart = (product: IProductDTO) => ({
  type: CartTypes.ADD_PRODUCT_TO_CART,
  payload: product,
});

export const updateProductInCart = (product: IProductDTO) => ({
  type: CartTypes.UPDATE_PRODUCT_IN_CART,
  payload: product,
});

export const changeProductUnit = (product: IProductDTO, unit: string) => ({
  type: CartTypes.CHANGE_PRODUCT_UNIT,
  payload: { product, unit },
});

export const removeProductFromCart = (product: IProductDTO) => ({
  type: CartTypes.REMOVE_PRODUCT_FROM_CART,
  payload: product,
});
