import { ALL_CATEGORIES } from "@constants/categories";
import { FiltersActionType, FiltersState, FilterTypes } from "../types/filters";

const initialState: FiltersState = {
  query: "",
  category: ALL_CATEGORIES,
  brands: [],
  ratings: [],
  prices: {
    min: 0,
    max: Infinity,
  },
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
    case FilterTypes.RESET_FILTERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
