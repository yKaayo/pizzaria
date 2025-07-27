import { configureStore } from "@reduxjs/toolkit";

// Features
import counterSlice from "./slices/counter";

const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export default store;
