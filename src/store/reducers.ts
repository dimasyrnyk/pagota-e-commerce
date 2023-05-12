import { combineReducers } from "redux";

import productsReducer from "./products/reducers";
import filtersReducer from "./filters/reducers";

export const rootReducer = combineReducers({
  products: productsReducer,
  filters: filtersReducer,
});

export default rootReducer;
