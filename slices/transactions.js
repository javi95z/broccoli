import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  data: []
}

const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearTransactions: () => initialState
  }
})

export const { setData, setLoading, clearTransactions } = transactions.actions

export default transactions.reducer
