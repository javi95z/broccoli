import { createSlice } from "@reduxjs/toolkit"

/**
 * @type {{
 * loading: Boolean,
 * data: Portfolio
 * }}
 */
const initialState = {
  loading: false,
  data: {}
}

const portfolio = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setPortfolio: (state, { payload }) => {
      state.data = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearPortfolio: () => initialState
  }
})

export const { setPortfolio, setLoading, clearPortfolio } = portfolio.actions

export default portfolio.reducer
