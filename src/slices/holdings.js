import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const holdings = createSlice({
  name: "holdings",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      return payload
    },
    clearHoldings: () => initialState
  }
})

export const { setData, clearHoldings } = holdings.actions

export default holdings.reducer
