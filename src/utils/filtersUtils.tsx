import { Location, NavigateFunction } from "react-router-dom";

import { ALL_CATEGORIES } from "@constants/categories";
import { IProduct } from "@constants/products";
import { IFilters } from "@store/types/filters";
import { store } from "@store/index";
import { getCurrentPrice } from "./productUtils";

export const filterProducts = (
  products: IProduct[],
  filters: IFilters
): IProduct[] => {
  const { query, category, brands, ratings, prices } = filters;
  const searchQuery = query && query.toLowerCase();

  return products.filter((product) => {
    const currentPrice = getCurrentPrice(product.price, product.discount);

    if (searchQuery && !product.title.toLowerCase().includes(searchQuery)) {
      return false;
    }

    if (category !== ALL_CATEGORIES && product.category !== category) {
      return false;
    }

    if (brands && brands.length && !brands.includes(product.producer)) {
      return false;
    }

    if (
      ratings &&
      ratings.length &&
      !ratings.includes(Math.round(product.rating))
    ) {
      return false;
    }

    if (prices && prices.min && currentPrice < prices.min) {
      return false;
    }

    if (prices && prices.max && currentPrice > prices.max) {
      return false;
    }

    return true;
  });
};

export const updateUrl = (
  filters: IFilters,
  navigate: NavigateFunction,
  location: Location
) => {
  const searchParams = new URLSearchParams(location.search);
  const minPrice = store.getState().products.minPrice;
  const maxPrice = store.getState().products.maxPrice;

  if (filters.query) {
    searchParams.set("query", filters.query);
  } else {
    searchParams.delete("query");
  }

  if (filters.category && filters.category !== ALL_CATEGORIES) {
    searchParams.set("category", filters.category);
  } else {
    searchParams.delete("category");
  }

  if (filters.brands && filters.brands.length) {
    searchParams.set("brands", filters.brands.join(","));
  } else {
    searchParams.delete("brands");
  }

  if (filters.ratings && filters.ratings.length) {
    searchParams.set("ratings", filters.ratings.join(","));
  } else {
    searchParams.delete("ratings");
  }

  if (
    (filters.prices && filters.prices.min !== minPrice) ||
    (filters.prices && filters.prices.max !== maxPrice)
  ) {
    searchParams.set("prices", Object.values(filters.prices).join(","));
  } else {
    searchParams.delete("prices");
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
  };
}
