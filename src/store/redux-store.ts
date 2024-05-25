import { createSlice, configureStore } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "ope",
  initialState: true,
  reducers: {},
});

const store = configureStore({ reducer: { modals: modalSlice.reducer } });

export default store
