import { Location, NavigateFunction } from "react-router-dom";
import queryString, { ParsedQuery } from "query-string";

import { AppDispatch, store } from "@store/index";
import {
  setFilterBrands,
  setFilterCategory,
  setFilterPrices,
  setFilterQuery,
  setFilterRatings,
  setFilterSortType,
} from "@store/filters/actions";
import { ALL_CATEGORIES } from "@constants/app";
import { Filters, SortType } from "@constants/filters";

export type SearchParams = {
  query?: string;
  category?: string;
  brands?: string[];
  ratings?: number[];
  prices?: number[];
  sort?: string;
};

export const updateUrl = (
  filters: Filters,
  navigate: NavigateFunction,
  location: Location
) => {
  const { query, category, brands, ratings, prices, sort } = filters;

  const minPrice = store.getState().products.minPrice;
  const maxPrice = store.getState().products.maxPrice;
  const params: SearchParams = {};

  if (query) {
    params.query = query;
  }

  if (category && category !== ALL_CATEGORIES) {
    params.category = category;
  }

  if (brands && brands.length) {
    params.brands = brands;
  }

  if (ratings && ratings.length) {
    params.ratings = ratings;
  }

  if (prices && (prices.min !== minPrice || prices.max !== maxPrice)) {
    params.prices = Object.values(prices);
  }

  if (sort && sort !== SortType.DEFAULT) {
    params.sort = sort;
  }

  const searchParams = queryString.stringify(params, { arrayFormat: "comma" });

  const newUrl = `${location.pathname}?${searchParams}`;
  navigate(newUrl);
};

export const parseSearchParams = (
  searchParams: ParsedQuery<string | number | boolean>,
  dispatch: AppDispatch
) => {
  const query = searchParams.query as string;
  const category = searchParams.category as string;
  const brands = (searchParams.brands as string[]) || [];
  const ratings = (searchParams.ratings as string[]) || [];
  const newRatings = Array.isArray(ratings) ? ratings : [ratings];
  const ratingsAsNumbers: number[] = newRatings.map((i) => parseInt(i, 10));
  const prices = (searchParams.prices as string[]) || [];
  const pricesAsNumbers: number[] = prices.map((i) => parseInt(i, 10));
  const sort = searchParams.sort as string;

  query && dispatch(setFilterQuery(query));
  category && dispatch(setFilterCategory(category));
  brands.length && dispatch(setFilterBrands(brands));
  ratingsAsNumbers.length && dispatch(setFilterRatings(ratingsAsNumbers));
  pricesAsNumbers.length &&
    dispatch(
      setFilterPrices({ min: pricesAsNumbers[0], max: pricesAsNumbers[1] })
    );
  sort && dispatch(setFilterSortType(sort));
};
