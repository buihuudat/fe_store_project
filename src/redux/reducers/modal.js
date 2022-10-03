import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    status: false,
    data: {},
  },
};

export const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setModal } = modalReducer.actions;
export default modalReducer.reducer;
