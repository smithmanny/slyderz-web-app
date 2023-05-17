import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import createAsyncThunk from "../useCreateAppAsyncThunk";

const createAppAsyncThunk = createAsyncThunk()

export interface StripePaymentType {
  id: string
  card: {
    last4: string
  }
}

export type AddAddressType = {
  address1: string
  address2: string
  city: string
  state: string
  zipcode: number
}

type SetLoadingStateType = {
  loading: boolean
}

type OnboardingStateType = "SETUP_STRIPE" | "UPLOAD_PROFILE_PHOTO" | "COMPLETE_SERVSAFE" | "ADD_PROFILE_DESCRIPTION"

export type ChefType = {
  isChef: boolean
  isChefProfileComplete: boolean
  onboardingState: OnboardingStateType
}

interface InitialStateType {
  loading: boolean
  address: {} | AddAddressType
  stripeCards: Array<StripePaymentType>
  chef: ChefType
}

type FetchUserDataType = {
  paymentMethods: Array<StripePaymentType>
  address: AddAddressType
  chefStatus: {
    isChef: boolean
    isChefProfileComplete: boolean
  }
}

const initialState: InitialStateType = {
  loading: false,
  address: {},
  stripeCards: [],
  chef: {
    isChef: false,
    isChefProfileComplete: false,
    onboardingState: "SETUP_STRIPE"
  },
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    ...initialState,
  },
  reducers: {
    addCard: (state, action: PayloadAction<StripePaymentType>) => {
      state.stripeCards.push(action.payload)
    },
    addAddress: (state, action: PayloadAction<AddAddressType>) => {
      state.address = action.payload
    },
    setLoadingState: (state, action: PayloadAction<SetLoadingStateType>) => {
      state.loading = action.payload.loading
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchUserData.fulfilled, (state, action) => {
      if (action.payload) {
        state.stripeCards = action.payload.paymentMethods
        state.address = action.payload.address

        if (action.payload.chefStatus.isChef) {
          state.chef.isChef = action.payload.chefStatus.isChef
          state.chef.isChefProfileComplete = action.payload.chefStatus.isChefProfileComplete
        }
      }
    })
  }
});

export const fetchUserData = createAppAsyncThunk(
  'user/fetchUserData',
  async (_, { dispatch }) => {
    dispatch(userSlice.actions.setLoadingState({ loading: true }))

    try {
      const res = await fetch('/api/user/getUserData')
      const body = await res.json()
      return body as FetchUserDataType
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(userSlice.actions.setLoadingState({ loading: false }))
    }
  }
)

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Extract and export each action creator by name
export const { addCard, addAddress } = actions;
// Export the reducer, either as a default or named export
export default reducer;