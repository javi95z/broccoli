import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  error: false,
  data: []
}

const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    getData: state => {
      state.loading = true
      state.error = false
    },
    getDataSuccess: (state, { payload }) => {
      state.data = payload
      state.loading = false
      state.error = false
    },
    getDataError: (state, { payload }) => {
      state.loading = false
      state.error = true
    },
    removeDataSuccess: (state, { payload }) => {
      state.data = state.data.filter(({ _id }) => _id !== payload)
    },
    clearTransactions: () => initialState
  }
})

export const {
  getData,
  getDataSuccess,
  getDataError,
  removeDataSuccess,
  clearTransactions
} = transactions.actions

export default transactions.reducer
