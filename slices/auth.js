import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  user: {},
  isLoggedIn: false
}

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogIn: (state, { payload }) => {
      state.user = payload
      state.isLoggedIn = true
    },
    logOutSuccess: () => initialState,
    setUserData: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    }
  }
})

export const { setLogIn, logOutSuccess, setUserData } = auth.actions

export default auth.reducer

export const selector = state => state.auth
