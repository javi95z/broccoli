import { createSlice } from "@reduxjs/toolkit"

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
  }
})

export const { setData, setLoading, clearHoldings } = holdings.actions

export default holdings.reducer