import { IProduct } from "@constants/products";

export type Brand = {
  name: string;
  category: string;
};

export function getTransformedData(products: IProduct[]) {
  const uniqueBrands = new Map<string, Brand>();
  const uniqueCategories = new Set<string>();
  let minPrice = Infinity;
  let maxPrice = 0;

  products.forEach((product: IProduct) => {
    const productCurrentPrice = Math.round(
      product.quantity.pcs.price * ((100 - product.discount) / 100)
    );

    const brandKey = `${product.producer}-${product.category}`;
    if (!uniqueBrands.has(brandKey)) {
      uniqueBrands.set(brandKey, {
        name: product.producer,
        category: product.category,
      });
    }

    uniqueCategories.add(product.category);
    minPrice = Math.min(minPrice, productCurrentPrice);
    maxPrice = Math.max(maxPrice, productCurrentPrice);
  });

  return {
    products: products,
    categories: [...uniqueCategories],
    brands: [...uniqueBrands.values()],
    minPrice: minPrice - 1,
    maxPrice: maxPrice + 1,
  };
}
