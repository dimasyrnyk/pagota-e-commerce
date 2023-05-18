import { Location, NavigateFunction } from "react-router-dom";

import { getCurrentPrice } from "./productUtils";
import { AppDispatch, store } from "@store/index";
import {
  setFilterBrands,
  setFilterCategory,
  setFilterPrices,
  setFilterQuery,
  setFilterRatings,
} from "@store/filters/actions";
import { ALL_CATEGORIES } from "@constants/app";
import { Brand, IProduct } from "@constants/products";
import { IFilters } from "@store/types/filters";
import { Filters, SortType } from "@constants/filters";

export const filterProducts = (
  products: IProduct[],
  filters: IFilters
): IProduct[] => {
  const { query, category, brands, ratings, prices, sort } = filters;
  const searchQuery = query && query.toLowerCase();

  return products
    .filter((product) => {
      const currentPrice = getCurrentPrice(product.price, product.discount);
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
    getCurrentPrice(a.price, a.discount) - getCurrentPrice(b.price, b.discount),
  [SortType.PRICE_FROM_HIGH]: (a, b) =>
    getCurrentPrice(b.price, b.discount) - getCurrentPrice(a.price, a.discount),
  [SortType.RATING_FROM_LOW]: (a, b) => a.rating - b.rating,
  [SortType.RATING_FROM_HIGH]: (a, b) => b.rating - a.rating,
  [SortType.DEFAULT]: () => 0,
};

export const updateUrl = (
  filters: Filters,
  navigate: NavigateFunction,
  location: Location
) => {
  const searchParams = new URLSearchParams(location.search);
  const minPrice = store.getState().products.minPrice;
  const maxPrice = store.getState().products.maxPrice;

  const { query, category, brands, ratings, prices, sort } = filters;

  if (query) {
    searchParams.set("query", query);
  } else {
    searchParams.delete("query");
  }

  if (category && category !== ALL_CATEGORIES) {
    searchParams.set("category", category);
  } else {
    searchParams.delete("category");
  }

  if (brands && brands.length) {
    searchParams.set("brands", brands.join(","));
  } else {
    searchParams.delete("brands");
  }

  if (ratings && ratings.length) {
    searchParams.set("ratings", ratings.join(","));
  } else {
    searchParams.delete("ratings");
  }

  if (
    (prices && prices.min !== minPrice) ||
    (prices && prices.max !== maxPrice)
  ) {
    searchParams.set("prices", Object.values(prices).join(","));
  } else {
    searchParams.delete("prices");
  }

  if (sort && sort !== SortType.DEFAULT) {
    searchParams.set("sort", sort);
  } else {
    searchParams.delete("sort");
  }

  const newUrl = `${location.pathname}?${searchParams.toString()}`;
  navigate(newUrl);
};

export function getFiltersWithNewBrand(
  category: string,
  selectedBrand: string
) {
  const { minPrice, maxPrice } = store.getState().products;
  return {
    query: "",
    category: category,
    brands: [selectedBrand],
    ratings: [],
    prices: { min: minPrice, max: maxPrice },
    sort: SortType.DEFAULT,
  };
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

export const parseSearchParams = (
  searchParams: URLSearchParams,
  dispatch: AppDispatch
) => {
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const brands = searchParams.getAll("brands") || [];
  const ratings =
    (searchParams.getAll("ratings") as string[]).map(Number) || [];
  const prices = {
    min: parseFloat(searchParams.getAll("price")[0]),
    max: parseFloat(searchParams.getAll("price")[1]),
  };

  query && dispatch(setFilterQuery(query));
  category && dispatch(setFilterCategory(category));
  brands.length && dispatch(setFilterBrands(brands));
  ratings.length && dispatch(setFilterRatings(ratings));
  prices.min && prices.max && dispatch(setFilterPrices(prices));
};
