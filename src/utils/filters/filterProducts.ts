import { store } from "@store/index";
import { IFilters } from "@store/types/filters";
import { getCurrentPrice } from "@utils/products/prices";
import { ALL_CATEGORIES } from "@constants/app";
import { Brand, IProduct } from "@constants/products";
import { Filters, SortType } from "@constants/filters";

export const filterProducts = (
  products: IProduct[],
  filters: IFilters
): IProduct[] => {
  const { query, category, brands, ratings, prices, sort } = filters;
  const searchQuery = query && query.toLowerCase();

  return products
    .filter((product) => {
      const currentPrice = getCurrentPrice(
        product.quantity.pcs.price,
        product.discount
      );
      const isTitleMatch = product.title.toLowerCase().includes(searchQuery);
      const isCategoryMatch =
        category === ALL_CATEGORIES || product.category === category;
      const isBrandMatch = !brands.length || brands.includes(product.producer);
      const isRatingMatch =
        !ratings.length || ratings.includes(Math.round(product.rating));
      const isMinPriceMatch = !prices.min || currentPrice >= prices.min;
      const isMaxPriceMatch = !prices.max || currentPrice <= prices.max;

      return (
        isTitleMatch &&
        isCategoryMatch &&
        isBrandMatch &&
        isRatingMatch &&
        isMinPriceMatch &&
        isMaxPriceMatch
      );
    })
    .sort((a, b) => sortFunctions[sort](a, b));
};

const sortFunctions: { [key: string]: (a: IProduct, b: IProduct) => number } = {
  [SortType.TITLE_FROM_LOW]: (a, b) => a.title.localeCompare(b.title),
  [SortType.TITLE_FROM_HIGH]: (a, b) => b.title.localeCompare(a.title),
  [SortType.PRICE_FROM_LOW]: (a, b) =>
    getCurrentPrice(a.quantity.pcs.price, a.discount) -
    getCurrentPrice(b.quantity.pcs.price, b.discount),
  [SortType.PRICE_FROM_HIGH]: (a, b) =>
    getCurrentPrice(b.quantity.pcs.price, b.discount) -
    getCurrentPrice(a.quantity.pcs.price, a.discount),
  [SortType.RATING_FROM_LOW]: (a, b) => a.rating - b.rating,
  [SortType.RATING_FROM_HIGH]: (a, b) => b.rating - a.rating,
  [SortType.DEFAULT]: () => 0,
};

export function getNewFilters(fields: Filters) {
  const { minPrice, maxPrice } = store.getState().products;
  const filters = store.getState().filters;
  const newFilters = {
    query: "",
    category: ALL_CATEGORIES,
    brands: [],
    ratings: [],
    prices: { min: minPrice, max: maxPrice },
    sort: filters.sort,
  };

  return { ...newFilters, ...fields };
}

export function isBrandsInNewCategory(
  category: string,
  filterBrands: string[]
) {
  const { brands } = store.getState().products;
  if (category === ALL_CATEGORIES) {
    return filterBrands;
  }

  return brands.reduce((acc: string[], brand: Brand) => {
    if (brand.category === category) {
      if (filterBrands.includes(brand.name)) {
        acc.push(brand.name);
      }
    }
    return acc;
  }, []);
}
