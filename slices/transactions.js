import { createSlice } from "@reduxjs/toolkit"

/**
 * @type {SelectorTransactions}
 */
const initialState = {
  data: [],
  loading: false,
  error: null
}

const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, { payload }) => {
      state.data = payload
      state.error = null
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    clearTransactions: () => initialState
  }
})

export const { setTransactions, setLoading, setError, clearTransactions } =
  transactions.actions

export default transactions.reducer
