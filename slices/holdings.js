import { createSlice } from "@reduxjs/toolkit"

/**
 * @type {{
 * loading: Boolean,
 * data: Holding[]
 * }}
 */
const initialState = {
  loading: false,
  data: []
}

const holdings = createSlice({
  name: "holdings",
  initialState,
  reducers: {
    setHoldings: (state, { payload }) => {
      state.data = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearHoldings: () => initialState
  }
})

export const { setHoldings, setLoading, clearHoldings } = holdings.actions

export default holdings.reducer
