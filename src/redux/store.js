import { configureStore } from "@reduxjs/toolkit";
import CollectionSlice from "~/components/Collections/CollectionSlice";
import productSlice from "~/components/Collections/Products/ProductSlice";

const store = configureStore({
  reducer: {
    // users: UserSlice.reducer,
    collections: CollectionSlice.reducer,
    products: productSlice.reducer,
    // orders: OrdersSlice.reducer,
    // order_detail: OrderDetailSlice.reducer,
  },
  devTools: true,
});

export default store;
