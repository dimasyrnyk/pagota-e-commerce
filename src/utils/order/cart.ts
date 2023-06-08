import { IProduct } from "@constants/products";
import { ICart, IProductDTO } from "@store/types/cart";

export const getCartWithUpdatedProduct = (
  cart: ICart,
  productToUpdate: IProductDTO,
  newUnit?: string
) => {
  const result = cart.products.map((product) => {
    const isMatched =
      product.id === productToUpdate.id &&
      product.quantity.unit === productToUpdate.quantity.unit;

    if (isMatched) {
      product.quantity.amount = productToUpdate.quantity.amount;
      if (newUnit) {
        product.quantity.unit = newUnit;
      }
      return product;
    } else {
      return product;
    }
  });

  return { ...cart, products: result };
};

export const getCartWithoutRemovedProducts = (
  cart: ICart,
  productToRemove: IProductDTO
) => {
  const result = cart.products.reduce((acc, product) => {
    const isMatched =
      product.id === productToRemove.id &&
      product.quantity.unit === productToRemove.quantity.unit;

    if (isMatched) {
      return acc;
    } else {
      return [...acc, product];
    }
  }, [] as IProductDTO[]);

  return { ...cart, products: result };
};

export const getNewCartProduct = (
  product: IProduct,
  unit: string,
  newCartQuantity: number
) => {
  const newCartProduct = {
    id: product.id,
    item: product,
    quantity: {
      unit: unit,
      amount: newCartQuantity,
    },
  };

  return newCartProduct;
};
