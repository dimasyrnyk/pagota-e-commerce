import { ALL_CATEGORIES } from "@constants/categories";
import { IProduct } from "@constants/products";

function searchProducts(
  allProducts: IProduct[],
  category: string,
  query: string
): IProduct[] {
  const filteredProducts =
    category === ALL_CATEGORIES
      ? allProducts
      : allProducts.filter((p) => p.category === category);

  const searchQuery = query.toLowerCase();

  if (!searchQuery) {
    return filteredProducts;
  }

  return filteredProducts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery)
  );
}

export default searchProducts;
