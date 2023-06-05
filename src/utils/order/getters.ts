import { store } from "@store/index";
import { IProduct, IQuantity } from "@constants/products";
import { ICart, IProductDTO } from "@store/types/cart";
import { Units } from "@constants/cart";

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

export const getNewTotalQuantity = (
  product: IProduct,
  unit: string,
  isUnitNeedToUpdate: boolean
) => {
  const products = store.getState().cart.cart.products;
  const matchedProducts: IProductDTO[] = products.filter(
    (p: IProductDTO) => p.id === product.id
  );

  if (!matchedProducts.length) {
    return product.quantity[unit].value;
  }

  const isUnitMatched = (product: IProductDTO) => {
    if (isUnitNeedToUpdate) {
      return true;
    }

    return product.quantity.unit !== unit;
  };

  let quantity = product.quantity;
  const productWithPcs = matchedProducts.find(
    (p) => p.quantity.unit === Units.PCS
  );
  const productWithPack = matchedProducts.find(
    (p) => p.quantity.unit === Units.PACK
  );
  const productWithKg = matchedProducts.find(
    (p) => p.quantity.unit === Units.KG
  );

  if (productWithPcs && isUnitMatched(productWithPcs)) {
    quantity = updateQuantity(quantity, productWithPcs.quantity.amount);
  }

  if (productWithPack && isUnitMatched(productWithPack)) {
    const amountInPcs =
      productWithPack.quantity.amount * product.quantity[Units.PACK].proportion;
    quantity = updateQuantity(quantity, amountInPcs);
  }

  if (productWithKg && isUnitMatched(productWithKg)) {
    const amountInPcs =
      productWithKg.quantity.amount * quantity[Units.KG].proportion;
    quantity = updateQuantity(quantity, amountInPcs);
  }

  return quantity[unit].value;
};

const updateQuantity = (quantity: IQuantity, decreaseValue: number) => {
  const updatedQuantity = { ...quantity };

  Object.keys(updatedQuantity).forEach((unit) => {
    const currentQuantity = updatedQuantity[unit].value;
    const proportion = updatedQuantity[unit].proportion;
    const newQuantity = currentQuantity - decreaseValue / proportion;

    updatedQuantity[unit] = {
      ...updatedQuantity[unit],
      value: newQuantity,
    };
  });

  return updatedQuantity;
};

export const getConvertedQuantity = (product: IProductDTO, newUnit: string) => {
  let quantityInPcs = 0;
  switch (product.quantity.unit) {
    case Units.PCS:
      quantityInPcs = product.quantity.amount;
      break;
    case Units.PACK:
      quantityInPcs =
        product.quantity.amount * product.item.quantity.pack.proportion;
      break;
    case Units.KG:
      quantityInPcs =
        product.quantity.amount * product.item.quantity.kg.proportion;
      break;
    default:
      break;
  }

  let convertedQuantity = 0;
  switch (newUnit) {
    case Units.PCS:
      convertedQuantity = quantityInPcs;
      break;
    case Units.PACK:
      convertedQuantity = quantityInPcs / product.item.quantity.pack.proportion;
      break;
    case Units.KG:
      convertedQuantity = quantityInPcs / product.item.quantity.kg.proportion;
      break;
    default:
      break;
  }

  return Math.floor(convertedQuantity);
};

export const getDeliveryDate = (days: number) => {
  const today = new Date();

  const deliveryDate = new Date(today.getTime());
  deliveryDate.setDate(deliveryDate.getDate() + days);

  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const formattedDeliveryDate = deliveryDate.toLocaleDateString(
    "en-US",
    options
  );

  return formattedDeliveryDate;
};
