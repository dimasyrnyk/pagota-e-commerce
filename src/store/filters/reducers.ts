import { ALL_CATEGORIES } from "@constants/app";
import { FiltersActionType, FiltersState, FilterTypes } from "../types/filters";
import { SortType } from "@constants/filters";

const initialState: FiltersState = {
  query: "",
  category: ALL_CATEGORIES,
  brands: [],
  ratings: [],
  prices: {
    min: 0,
    max: Infinity,
  },
  sort: SortType.DEFAULT,
  isLoading: false,
};

export default function filtersReducer(
  state = initialState,
  action: FiltersActionType
): FiltersState {
  switch (action.type) {
    case FilterTypes.SET_FILTER_QUERY:
      return { ...state, query: action.payload };
    case FilterTypes.SET_FILTER_CATEGORY:
      return { ...state, category: action.payload };
    case FilterTypes.SET_FILTER_BRANDS:
      return { ...state, brands: action.payload };
    case FilterTypes.SET_FILTER_RATINGS:
      return { ...state, ratings: action.payload };
    case FilterTypes.SET_FILTER_PRICES:
      return { ...state, prices: action.payload };
    case FilterTypes.SET_FILTER_SORT_TYPE:
      return { ...state, sort: action.payload };
    case FilterTypes.UPDATE_FILTERS:
      return { ...state, ...action.payload };
    case FilterTypes.RESET_FILTERS:
      return { ...initialState, prices: action.payload };
    default:
      return state;
  }
}
