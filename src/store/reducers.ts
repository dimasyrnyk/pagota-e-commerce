import { combineReducers } from "redux";

import productsReducer from "./products/reducers";
import filtersReducer from "./filters/reducers";
import cartReducer from "./cart/reducers";

export const rootReducer = combineReducers({
  products: productsReducer,
  filters: filtersReducer,
  cart: cartReducer,
});

export default rootReducer;
