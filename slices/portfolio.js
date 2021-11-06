import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { http } from "../services"
import settings from "../settings.json"

/**
 * @returns {AsyncThunk}
 */
export const fetchPortfolio = createAsyncThunk("portfolio/fetch", async () => {
  const route = settings.API_ROUTES.PORTFOLIO
  const response = await http.get(route)
  return response.data
})

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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPortfolio.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
      })
      .addCase(fetchPortfolio.pending, state => {
        state.loading = true
      })
      .addCase(fetchPortfolio.rejected, state => {
        state.loading = false
      })
  }
})

export const { setData, setLoading, clearHoldings } = portfolio.actions

export default portfolio.reducer
