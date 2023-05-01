import { combineReducers, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux"

import modals from "./reducers/modalReducer";
import paymentMethods from "./reducers/paymentMethods";

const store = configureStore({
  reducer: combineReducers({ modals, paymentMethods }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;