import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "~/api/productApi";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    values: [],
    search: "a",
  },
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(searchProductsByName.fulfilled, (state, action) => {
        const response = action.payload;
        state.values = response.filter((product) => {
          return product.name.includes(state.search);
        });
      });
  },
});

export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  const res = await productApi.getAll();
  return res;
});

export const getProduct = createAsyncThunk("products/get", async (id) => {
  const res = await productApi.get(id);
  return [res];
});

export const searchProductsByName = createAsyncThunk(
  "products/findByName",
  async () => {
    const res = await productApi.getAll();
    return res;
  }
);

export default productSlice;
