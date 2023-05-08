import { combineReducers } from "redux";

import productsReducer from "./products/reducers";

export const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
