import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    chef: null,
    cartTotal: 0,
    dishIds: [],
    selectedCartItems: [],
  },
  reducers: {
    addChef: (state, action) => {
      state.chef = action.payload;
    },
    addDish: (state, action) => {
      const item = action.payload;

      state.dishIds.push(action.payload.id);
      state.selectedCartItems.push(item);
    },
    decreaseDishQuantity: (state, action) => {
      const dish = action.payload;
      const dishIndex = state.selectedCartItems
        .map((sci) => sci.id)
        .indexOf(dish.id);

      state.selectedCartItems[dishIndex].quantity -= 1;
    },
    decreaseCartTotal: (state, action) => {
      const { price, quantity } = action.payload;
      const amount = quantity * price;

      state.cartTotal -= amount;
    },
    increaseCartTotal: (state, action) => {
      const { price, quantity } = action.payload;
      const amount = quantity * price;

      state.cartTotal += amount;
    },
    increaseDishQuantity: (state, action) => {
      const dish = action.payload;
      const dishIndex = state.selectedCartItems
        .map((sci) => sci.id)
        .indexOf(dish.id);

      state.selectedCartItems[dishIndex].quantity += dish.quantity;
    },
    removeDish: (state, action) => {
      state.selectedCartItems.filter((item) => item.id !== action.payload.id);
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;
// Extract and export each action creator by name
export const {
  addChef,
  addDish,
  decreaseDishQuantity,
  decreaseCartTotal,
  increaseDishQuantity,
  increaseCartTotal,
  removeDish,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;

export const addDishToCart = (orderChef, selectedCartItem) => async (
  dispatch,
  getState
) => {
  const {
    cart: { chef, dishIds },
  } = getState();

  // Add chef to cart
  if (chef === null) {
    dispatch(addChef(orderChef));
  }
  // Update dishes in cart
  if (dishIds.includes(selectedCartItem.id)) {
    dispatch(increaseDishQuantity(selectedCartItem));
    dispatch(
      increaseCartTotal({
        price: selectedCartItem.price,
        quantity: selectedCartItem.quantity,
      })
    );
  } else {
    // Add dishes to cart
    dispatch(addDish(selectedCartItem));
    dispatch(
      increaseCartTotal({
        price: selectedCartItem.price,
        quantity: selectedCartItem.quantity,
      })
    );
  }
};

export const increaseQuantity = (selectedCartItem) => async (dispatch) => {
  dispatch(increaseDishQuantity(selectedCartItem));
  dispatch(
    increaseCartTotal({
      price: selectedCartItem.price,
      quantity: selectedCartItem.quantity,
    })
  );
};

export const decreaseQuantity = (selectedCartItem) => async (
  dispatch,
  getState
) => {
  const {
    cart: { selectedCartItems },
  } = getState();

  const dishIndex = selectedCartItems
    .map((sci) => sci.id)
    .indexOf(selectedCartItem.id);
  const dish = selectedCartItems[dishIndex];

  // If quantity is 1 remove item
  if (dish.quantity === 1) {
    dispatch(removeDish(dish));
    return;
  }

  dispatch(decreaseDishQuantity(selectedCartItem));
  dispatch(
    decreaseCartTotal({
      price: selectedCartItem.price,
      quantity: selectedCartItem.quantity,
    })
  );
};
