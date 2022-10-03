import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  add: [],
};

export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.data = action.payload;
    },
    setAddProduct: (state, action) => {
      state.add = action.payload;
    },
  },
});

export const { setProduct, setAddProduct } = productReducer.actions;
export default productReducer.reducer;
