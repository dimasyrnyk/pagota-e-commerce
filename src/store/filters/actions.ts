import { FilterTypes, IFilters, IPrices } from "@store/types/filters";

export const setFilterQuery = (query: string) => ({
  type: FilterTypes.SET_FILTER_QUERY,
  payload: query,
});

export const setFilterCategory = (category: string) => ({
  type: FilterTypes.SET_FILTER_CATEGORY,
  payload: category,
});

export const setFilterBrands = (brands: string[]) => ({
  type: FilterTypes.SET_FILTER_BRANDS,
  payload: brands,
});

export const setFilterRatings = (ratings: number[]) => ({
  type: FilterTypes.SET_FILTER_RATINGS,
  payload: ratings,
});

export const setFilterPrices = (prices: IPrices) => ({
  type: FilterTypes.SET_FILTER_PRICES,
  payload: prices,
});

export const resetFilters = (filters: IFilters) => ({
  type: FilterTypes.RESET_FILTERS,
  payload: filters,
});
