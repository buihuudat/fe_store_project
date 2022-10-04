import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    status: false,
    data: {},
  },
  cart: false,
};

export const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.product = action.payload;
    },
    setCartModal: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setModal, setCartModal } = modalReducer.actions;
export default modalReducer.reducer;
