import React, { useReducer } from 'react';

const OPEN_CART = 'OPEN_CART'
const CLOSE_CART = 'CLOSE_CART'

const INITIAL_STATE = {
  cart: {
    chef: {},
    items: [],
    total: 0,
  },
  showCart: false,
}

function reducer(state, action) {
  switch (action.type) {
    case CLOSE_CART:
      return { ...INITIAL_STATE, showCart: false }
    case OPEN_CART:
      return { ...INITIAL_STATE, showCart: true }
    default:
      return state
  }
}

export const CheckoutCartContext = React.createContext();

const CheckoutCartProvider = ({ children }) => {
  const cartValue = useReducer(reducer, INITIAL_STATE)
  return (
    <CheckoutCartContext.Provider value={cartValue}>
      {children}
    </CheckoutCartContext.Provider>
  )
}
export default CheckoutCartProvider;
