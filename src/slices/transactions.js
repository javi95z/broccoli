import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      return payload
    },
    clearTransactions: () => initialState
  }
})

export const { setData, clearTransactions } = transactions.actions

export default transactions.reducer
