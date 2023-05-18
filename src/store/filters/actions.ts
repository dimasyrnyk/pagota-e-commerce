import {
  FiltersActionType,
  FilterTypes,
  IFilters,
  IPrices,
} from "@store/types/filters";

export const setFilterQuery = (query: string) => ({
  type: FilterTypes.SET_FILTER_QUERY,
  payload: query,
});

export const setFilterCategory = (category: string): FiltersActionType => ({
  type: FilterTypes.SET_FILTER_CATEGORY,
  payload: category,
});

export const setFilterBrands = (brands: string[]): FiltersActionType => ({
  type: FilterTypes.SET_FILTER_BRANDS,
  payload: brands,
});

export const setFilterRatings = (ratings: number[]): FiltersActionType => ({
  type: FilterTypes.SET_FILTER_RATINGS,
  payload: ratings,
});

export const setFilterPrices = (prices: IPrices): FiltersActionType => ({
  type: FilterTypes.SET_FILTER_PRICES,
  payload: prices,
});

export const resetFilters = (filters: IFilters): FiltersActionType => ({
  type: FilterTypes.RESET_FILTERS,
  payload: filters,
});

export const setSortType = (sortType: string): FiltersActionType => ({
  type: FilterTypes.SET_SORT_TYPE,
  payload: sortType,
});
