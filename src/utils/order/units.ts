import { store } from "@store/index";
import { IProduct } from "@constants/products";
import { IProductDTO } from "@store/types/cart";

export const getMatchedUnits = (product: IProduct, unit: string) => {
  const products = store.getState().cart.cart.products;
  const matchedProducts = products.filter((p: IProduct) => p.id === product.id);
  const matchedUnits = matchedProducts.filter(
    (p: IProductDTO) => p.quantity.unit === unit
  );

  return matchedUnits;
};
