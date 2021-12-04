import { createSlice } from "@reduxjs/toolkit"

/** @type {SelectorPortfolio} */
const initialState = {
  data: {},
  loading: false,
  error: null
}

const portfolio = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setPortfolio: (state, { payload }) => {
      state.data = payload
      state.error = null
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    clearPortfolio: () => initialState
  }
})

export const { setPortfolio, setLoading, setError, clearPortfolio } =
  portfolio.actions

export default portfolio.reducer
