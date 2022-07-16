import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersApi from "~/api/ordersApi";

export const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    values: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.values = action.payload;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.values = action.payload;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.values.push(action.payload);
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        action.payload = state.values.find(
          (product) => product === action.payload.id
        );
      });
  },
});

export const createOrder = createAsyncThunk(
  "orders/create",
  async ({ id, user_id, create_at, note }) => {
    const res = await ordersApi.create({
      id,
      user_id,
      note,
      create_at,
    });
    return res;
  }
);

export const getAllOrders = createAsyncThunk("orders/getAll", async () => {
  const res = await ordersApi.getAll();
  return res;
});

export const getOrders = createAsyncThunk("orders/get", async (id) => {
  const res = await ordersApi.get(id);
  return res;
});

export const updateOrder = createAsyncThunk(
  "orders/update",
  async ({ id, data }) => {
    const res = await ordersApi.update(id, data);
    return res;
  }
);

export default OrderSlice;
