import { combineReducers } from "redux";

import productsReducer from "./products/reducers";
import filtersReducer from "./filters/reducers";
import cartReducer from "./cart/reducers";
import authReducer from "./auth/reducers";

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  filters: filtersReducer,
  cart: cartReducer,
});

export default rootReducer;
