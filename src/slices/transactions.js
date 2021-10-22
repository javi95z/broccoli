import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      return payload
    },
    removeData: (state, { payload }) => {
      return state.filter(({ _id }) => _id !== payload)
    },
    addData: (state, { payload }) => {
      state.push(payload)
      return sortByDateDesc(state)
    },
    clearData: () => initialState
  }
})

export const { setData, removeData, addData, clearData } = transactions.actions

export default transactions.reducer

const sortByDateDesc = data => data.sort((a, b) => (a.date < b.date ? 1 : -1))
