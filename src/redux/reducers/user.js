import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = UserReducer.actions;
export default UserReducer.reducer;
