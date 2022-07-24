import { configureStore } from "@reduxjs/toolkit";
import CollectionSlice from "~/components/Collections/CollectionSlice";
import UserSlice from "~/components/User/UserSlice";
import ContactSlice from "~/pages/Contact/ContactSlice";
import AuthSlice from "~/pages/Login/AuthSlice";
import OrderDetailSlice from "~/pages/OrderDone/OrderDetailSlice";
import OrderSlice from "~/pages/OrderDone/OrderSlice";
import productSlice from "~/pages/Products/ProductSlice";

const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    auth: AuthSlice.reducer,
    collections: CollectionSlice.reducer,
    products: productSlice.reducer,
    orders: OrderSlice.reducer,
    order_detail: OrderDetailSlice.reducer,
    questions: ContactSlice.reducer,
  },
});

export default store;
