import { combineReducers, configureStore } from "@reduxjs/toolkit";

import modals from "./reducers/modalReducer";

const store = configureStore({
  reducer: combineReducers({ modals }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;