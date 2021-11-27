import { createSlice } from "@reduxjs/toolkit"

/**
 * @type {{
 * loading: Boolean,
 * data: Transaction[]
 * }}
 */
const initialState = {
  loading: false,
  data: []
}

const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, { payload }) => {
      state.data = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearTransactions: () => initialState
  }
})

export const { setTransactions, setLoading, clearTransactions } =
  transactions.actions

export default transactions.reducer
