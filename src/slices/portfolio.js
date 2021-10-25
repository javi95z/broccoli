import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const portfolio = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      return payload
    },
    clearPortfolio: () => initialState
  }
})

export const { setData, clearHoldings } = portfolio.actions

export default portfolio.reducer
