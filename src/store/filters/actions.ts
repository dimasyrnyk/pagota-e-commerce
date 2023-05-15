import { FilterTypes } from "@store/types/filters";

export const setFilterCategory = (category: string) => ({
  type: FilterTypes.SET_FILTER_CATEGORY,
  payload: category,
});

export const setFilterQuery = (query: string) => ({
  type: FilterTypes.SET_FILTER_QUERY,
  payload: query,
});
