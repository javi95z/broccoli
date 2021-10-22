import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const holdings = createSlice({
  name: "holdings",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      return payload
    },
    clearData: () => initialState
  }
})

export const { setData, clearData } = holdings.actions

export default holdings.reducer
