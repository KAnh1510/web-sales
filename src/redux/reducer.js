import { combineReducers } from "redux";
import searchProductReducer from "~/components/User/Search/SearchProductSlice";

const rootReducer = combineReducers({
  products: searchProductReducer,
});

export default rootReducer;
