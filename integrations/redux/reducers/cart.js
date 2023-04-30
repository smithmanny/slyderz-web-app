import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventDate: '',
  eventTime: ''
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
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
const { actions, reducer } = cartSlice;
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
