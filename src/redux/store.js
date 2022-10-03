import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./reducers/products";
import UserReducer from "./reducers/user";
import modalReducer from "./reducers/modal";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: UserReducer,
    modal: modalReducer,
  },
});

export default store;
