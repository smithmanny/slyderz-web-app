import { combineReducers, configureStore } from "@reduxjs/toolkit";

import modals from "./reducers/modalReducer";

const store = configureStore({
  reducer: combineReducers({ modals }),
});

export default store;
