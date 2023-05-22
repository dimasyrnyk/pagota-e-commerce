import { ALL_CATEGORIES } from "@constants/app";
import { IProduct } from "@constants/products";
import { store } from "@store/index";

export type Brand = {
  name: string;
  category: string;
};

export function getCategoryBrands(category: string) {
  const { brands } = store.getState().products;
  if (category === ALL_CATEGORIES) {
    return brands.map((brand: Brand) => brand.name);
  }
  return brands.reduce((acc: string[], brand: Brand) => {
    if (brand.category === category) {
      acc.push(brand.name);
    }
    return acc;
  }, []);
}

export function getCategoryLength(category: string) {
  const allProducts = store.getState().products.allProducts;
  if (category === ALL_CATEGORIES) {
    return allProducts.length;
  }
  return allProducts.filter((p: IProduct) => p.category === category).length;
}
