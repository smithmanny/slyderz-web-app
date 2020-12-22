import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    chef: null,
    selectedCartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      if (state.chef === null) {
        state.chef = action.payload.chef;
      }
      state.selectedCartItems.push(action.payload.selectedCartItem);
    },
    removeItem: (state, action) => {},
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;
// Extract and export each action creator by name
export const { addItem, removeItem } = actions;
// Export the reducer, either as a default or named export
export default reducer;
