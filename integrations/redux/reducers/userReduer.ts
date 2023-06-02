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
  address2: string | null
  city: string
  state: string
  zipcode: string
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
  userId: string
  email: string
  name: string
  address: object | AddAddressType
  stripeCards: Array<StripePaymentType>
  chef: ChefType
}

type FetchUserDataType = {
  paymentMethods: Array<StripePaymentType>
  address: AddAddressType
  email: string
  name: string
  chefStatus: {
    isChef: boolean
    isChefProfileComplete: boolean
  }
  userId: string
}

type UpdateUser = Partial<InitialStateType>

const initialState: InitialStateType = {
  loading: false,
  userId: "",
  address: {},
  email: "",
  name: "",
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
      state.address["address1"] = action.payload.address1
      state.address["address2"] = action.payload.address2 || ""
      state.address["city"] = action.payload.city
      state.address["state"] = action.payload.state
      state.address["zipcode"] = action.payload.zipcode
    },
    setLoadingState: (state, action: PayloadAction<SetLoadingStateType>) => {
      state.loading = action.payload.loading
    },
    logout: (state, action: PayloadAction<undefined>) => {
      return initialState
    },
    updateUser: (state, action: PayloadAction<UpdateUser>) => {
      return {
        ...state,
        ...action.payload
      }
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchUserData.fulfilled, (state, action) => {
      if (action.payload) {
        state.stripeCards = action.payload.paymentMethods
        state.address = action.payload.address
        state.userId = action.payload.userId
        state.email = action.payload.email
        state.name = action.payload.name

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
export const { addCard, addAddress, updateUser, logout } = actions;
// Export the reducer, either as a default or named export
export default reducer;