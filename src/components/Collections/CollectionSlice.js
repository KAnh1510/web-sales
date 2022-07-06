import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import collectionApi from "~/api/collectionApi";

export const CollectionSlice = createSlice({
  name: "collections",
  initialState: {
    loading: false,
    values: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCollections.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllCollections.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.values = action.payload;
      });
  },
});

export const getAllCollections = createAsyncThunk(
  "collections/getAll",
  async () => {
    const res = await collectionApi.getAll();
    return res;
  }
);

export const getCollection = createAsyncThunk("collections/get", async (id) => {
  const res = await collectionApi.get(id);
  return [res];
});
export default CollectionSlice;
