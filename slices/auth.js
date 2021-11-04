import { createSlice } from "@reduxjs/toolkit"
// import http from "../services/http"
// import settings from "../settings.json"

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
    setUserData: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    }
  }
})

export const { logInSuccess, logInError, logOutSuccess, setUserData } =
  auth.actions

export default auth.reducer

export const selector = state => state.auth

/**
 * Perform logout action
 * Remove user data from localStorage
 */
// export function doLogOut() {
//   const route = settings.API_ROUTES.LOG_OUT

//   return async dispatch => {
//     try {
//       await http.put(route)
//       dispatch(logOutSuccess())
//       localStorage.removeItem("user")
//     } catch ({ response }) {
//       dispatch(logInError(response.data))
//     }
//   }
// }