import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  menuItemModalOpen: false
}

const modal = createSlice({
  name: "modal",
  initialState: {
    ...initialState
  },
  reducers: {
    openMenuItemModal: (state) => {
      state.menuItemModalOpen = true;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      return initialState;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = modal;
// Extract and export each action creator by name
export const { openMenuItemModal, closeModal } = actions;
// Export the reducer, either as a default or named export
export default reducer;

// export const decreaseMenuItem = () => async(dispatch, getState) => {
//   const {
//     menuItem: { quantity },
//   } = getState();

//   if (quantity === 1) {
//     dispatch(resetQuantity())
//   } else {
//     dispatch(decreaseQuantity())
//   }
// }
