import { createSlice, configureStore } from "@reduxjs/toolkit";
import { currentUserState } from "@/types/types";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { user: {} as currentUserState },
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { currentUser: currentUserSlice.reducer },
});

export default store;
export const currentUserActions = currentUserSlice.actions;
