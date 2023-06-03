import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "integrations/redux";

const useCreateAppAsyncThunk = () => {
  return createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
  }>();
};

export default useCreateAppAsyncThunk;
