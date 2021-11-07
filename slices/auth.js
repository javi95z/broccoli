import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  loading: false,
  error: false,
  isLoggedIn: false,
  user: {}
}

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInSuccess: (state, { payload }) => {
      state.user = payload
      state.isLoggedIn = true
      state.error = false
    },
    logOutSuccess: () => initialState,
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setUserData: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    }
  }
})

export const { logInSuccess, logOutSuccess, setLoading, setUserData } =
  auth.actions

export default auth.reducer

export const selector = state => state.auth
