import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  data: []
}

const portfolio = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearPortfolio: () => initialState
  }
})

export const { setData, setLoading, clearHoldings } = portfolio.actions

export default portfolio.reducer
