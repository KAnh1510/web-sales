import { configureStore } from "@reduxjs/toolkit";
import CollectionSlice from "~/components/Collections/CollectionSlice";
import productSlice from "~/components/Collections/Products/ProductSlice";
import AuthSlice from "~/components/User/AuthSlice";
import UserSlice from "~/components/User/UserSlice";
import OrderDetailSlice from "~/pages/Cart/OrderDetailSlice";
import OrderSlice from "~/pages/Cart/OrderSlice";
import ContactSlice from "~/pages/Contact/ContactSlice";

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
