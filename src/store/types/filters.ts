export interface IPrices {
  min: number;
  max: number;
}

export interface FiltersState {
  query: string;
  category: string;
  brands: string[];
  ratings: number[];
  prices: IPrices;
  sort: string;
  isLoading: boolean;
}

export interface IFilters {
  query: string;
  category: string;
  brands: string[];
  ratings: number[];
  prices: IPrices;
  sort: string;
}

export enum FilterTypes {
  SET_FILTER_QUERY = "filter/SET_QUERY",
  SET_FILTER_CATEGORY = "filter/SET_CATEGORY",
  SET_FILTER_BRANDS = "filter/SET_BRANDS",
  SET_FILTER_RATINGS = "filter/SET_RATINGS",
  SET_FILTER_PRICES = "filter/SET_PRICES",
  RESET_FILTERS = "filter/RESET",
  SET_SORT_TYPE = "filter/SET_SORT_TYPE",
}

interface SetQueryAction {
  type: FilterTypes.SET_FILTER_QUERY;
  payload: string;
}

interface SetCategoryAction {
  type: FilterTypes.SET_FILTER_CATEGORY;
  payload: string;
}

interface SetBrandsAction {
  type: FilterTypes.SET_FILTER_BRANDS;
  payload: string[];
}

interface SetRatingsAction {
  type: FilterTypes.SET_FILTER_RATINGS;
  payload: number[];
}

interface SetPricesAction {
  type: FilterTypes.SET_FILTER_PRICES;
  payload: IPrices;
}

interface ResetFiltersAction {
  type: FilterTypes.RESET_FILTERS;
  payload: IFilters;
}

interface SetSortTypeAction {
  type: FilterTypes.SET_SORT_TYPE;
  payload: string;
}

export type FiltersActionType =
  | SetQueryAction
  | SetCategoryAction
  | SetBrandsAction
  | SetRatingsAction
  | SetPricesAction
  | ResetFiltersAction
  | SetSortTypeAction;
