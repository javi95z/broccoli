import { createSlice } from "@reduxjs/toolkit"

/** @type {SelectorHoldings} */
const initialState = {
  data: [],
  loading: false,
  error: null
}

const holdings = createSlice({
  name: "holdings",
  initialState,
  reducers: {
    setHoldings: (state, { payload }) => {
      state.data = payload
      state.error = null
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    clearHoldings: () => initialState
  }
})

export const { setHoldings, setLoading, setError, clearHoldings } =
  holdings.actions

export default holdings.reducer
