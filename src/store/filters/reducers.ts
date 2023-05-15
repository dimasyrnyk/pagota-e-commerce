import { ALL_CATEGORIES } from "@constants/categories";
import { FiltersActionType, FiltersState, FilterTypes } from "../types/filters";

const initialState: FiltersState = {
  query: "",
  category: ALL_CATEGORIES,
  brands: [],
  rating: [],
  minPrice: 0,
  maxPrice: 0,
  isLoading: false,
};

export default function filtersReducer(
  state = initialState,
  action: FiltersActionType
): FiltersState {
  switch (action.type) {
    case FilterTypes.SET_FILTER_CATEGORY:
      return { ...state, category: action.payload };
    case FilterTypes.SET_FILTER_QUERY:
      return { ...state, query: action.payload };
    default:
      return state;
  }
}
