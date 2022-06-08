import { configureStore } from "@reduxjs/toolkit";
import searchProductSlice from "~/components/User/Search/SearchProductSlice";

const store = configureStore({
  reducer: {
    products: searchProductSlice.reducer,
  },
});

export default store;
