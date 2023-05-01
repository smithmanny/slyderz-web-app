import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from "integrations/redux";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()

export interface StripePaymentType {
  id: string
  card: {
    last4: string
  }
}

interface InitialStateType {
  stripeCards: Array<StripePaymentType>
  fetchedStripeCards: boolean
}

export const fetchStripePayments = createAppAsyncThunk(
  'paymentMethods/fetchStripePayments',
  async (_, { getState }) => {
    const { fetchedStripeCards, stripeCards } = getState().paymentMethods
    if (fetchedStripeCards) {
      return stripeCards
    }

    try {
      const res = await fetch('/api/stripe/getStripePayments')
      const body = await res.json()
      return body.paymentMethods as Array<StripePaymentType>
    } catch(err) {
      console.log(err)
    }
  }
)

const initialState: InitialStateType = {
  stripeCards: [],
  fetchedStripeCards: false
}

const paymentMethodsSlice = createSlice({
  name: "paymentMethods",
  initialState: {
    ...initialState,
  },
  reducers: {
    addCard: (state, action: PayloadAction<StripePaymentType>) => {
      state.stripeCards.push(action.payload)
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchStripePayments.fulfilled, (state, action) => {
      if (action.payload) {
        state.stripeCards = action.payload
        state.fetchedStripeCards = true
      }
    })
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = paymentMethodsSlice;
// Extract and export each action creator by name
export const { addCard } = actions;
// Export the reducer, either as a default or named export
export default reducer;
