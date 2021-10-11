import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  error: false,
  data: [],
  removeLoading: false
}

const positions = createSlice({
  name: "positions",
  initialState,
  reducers: {
    getData: state => {
      state.loading = true
      state.error = false
    },
    getDataSuccess: (state, { payload }) => {
      state.data = payload
      state.loading = false
      state.error = false
    },
    getDataError: (state, { payload }) => {
      state.loading = false
      state.error = true
    },
    removeDataSuccess: (state, { payload }) => {
      state.data = state.data.filter(({ _id }) => _id !== payload)
    },
    clearPositions: () => initialState
  }
})

export const {
  getData,
  getDataSuccess,
  getDataError,
  removeDataSuccess,
  clearPositions
} = positions.actions

export default positions.reducer
