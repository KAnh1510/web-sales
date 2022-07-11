import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionsApi from "~/api/questionApi";

export const ContactSlice = createSlice({
  name: "question",
  initialState: {
    loading: false,
    values: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.values = action.payload;
      })

      .addCase(createQuestion.fulfilled, (state, action) => {
        state.values.push(action.meta.arg);
      })

      .addCase(updateQuestion.fulfilled, (state, action) => {
        action.payload = state.values.find(
          (question) => question === action.payload.id
        );
      });
  },
});

export const createQuestion = createAsyncThunk(
  "question/create",
  async ({ name, email, phoneNumber, note }) => {
    const res = await questionsApi.create({
      name,
      email,
      phoneNumber,
      note,
    });
    return res.data;
  }
);

export const getQuestion = createAsyncThunk("question/get", async (id) => {
  const res = await questionsApi.get(id);
  return res;
});

export const updateQuestion = createAsyncThunk(
  "order_detail/update",
  async ({ id, data }) => {
    const res = await questionsApi.update(id, data);
    return res;
  }
);

export default ContactSlice;
