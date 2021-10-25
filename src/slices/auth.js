import { createSlice } from "@reduxjs/toolkit"
import http from "../services/http"
import settings from "../settings.json"

export const initialState = {
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
    logInError: (state, { payload }) => {
      state.error = payload || true
    },
    logOutSuccess: () => initialState,
    logOutError: state => {
      state.error = true
    }
  }
})

export const {
  authStart,
  logInSuccess,
  logInError,
  logOutSuccess,
  logOutError
} = auth.actions

export default auth.reducer

export const selector = state => state.auth

/**
 * Perform logout action
 * Remove user data from localStorage
 */
export function doLogOut() {
  const route = process.env.REACT_APP_API_URL + settings.API_ROUTES.LOG_OUT

  return async dispatch => {
    dispatch(authStart())

    try {
      await http.put(route)
      dispatch(logOutSuccess())
      localStorage.removeItem("user")
    } catch ({ response }) {
      dispatch(logInError(response.data))
    }
  }
}
