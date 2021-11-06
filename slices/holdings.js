import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { http } from "../services"
import settings from "../settings.json"

/**
 * @returns {AsyncThunk}
 */
export const fetchHoldings = createAsyncThunk("holdings/fetch", async () => {
  const route = settings.API_ROUTES.HOLDINGS
  const response = await http.get(route)
  return response.data
})

const initialState = {
  loading: false,
  data: []
}

const holdings = createSlice({
  name: "holdings",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearHoldings: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHoldings.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
      })
      .addCase(fetchHoldings.pending, state => {
        state.loading = true
      })
      .addCase(fetchHoldings.rejected, state => {
        state.loading = false
      })
  }
})

export const { setData, setLoading, clearHoldings } = holdings.actions

export default holdings.reducer
