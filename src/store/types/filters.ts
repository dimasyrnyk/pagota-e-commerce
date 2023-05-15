export interface FiltersState {
  query: string;
  category: string;
  brands: string[];
  rating: number[];
  minPrice: number;
  maxPrice: number;
  isLoading: boolean;
}

export enum FilterTypes {
  SET_FILTER_CATEGORY = "filter/SET_CATEGORY",
  SET_FILTER_QUERY = "filter/SET_QUERY",
}

interface SetCategoryAction {
  type: FilterTypes.SET_FILTER_CATEGORY;
  payload: string;
}

interface SetQueryAction {
  type: FilterTypes.SET_FILTER_QUERY;
  payload: string;
}

export type FiltersActionType = SetCategoryAction | SetQueryAction;
