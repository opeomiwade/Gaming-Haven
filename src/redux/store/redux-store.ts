import { createSlice, configureStore } from "@reduxjs/toolkit";
import { currentUserState } from "@/types/types";
import { Listing } from "@/types/types";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { user: {} as currentUserState },
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },

    updateUserData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

const sellModalSlice = createSlice({
  name: "sell-modal",
  initialState: { open: false },
  reducers: {
    openModal(state) {
      state.open = true;
    },

    closeModal(state) {
      state.open = false;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as Listing[] },
  reducers: {
    addToCart(state, action) {
      state.items = [...state.items, action.payload];
    },

    removeCart(state, action) {
      state.items = state.items.filter(
        (item) => item.listingId !== action.payload.listingId
      );
    },
  },
});

const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
    sellModal: sellModalSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
export const currentUserActions = currentUserSlice.actions;
export const sellModalActions = sellModalSlice.actions;
export const cartActions = cartSlice.actions;
