import i18n from "i18next"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchPortfolio } from "./portfolio"
import { http, toast } from "../services"
import settings from "../settings.json"

/** @returns {AsyncThunk} */
export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (body, { dispatch }) => {
    const route = settings.API_ROUTES.TRANSACTIONS
    try {
      const response = await http.post(route, body)
      toast.success(i18n.t("transactions.message.added"))
      dispatch(fetchPortfolio())
      return response.data
    } catch (e) {
      const { data } = e.response
      toast.error(data?.message || i18n.t("transactions.message.notAdded"))
      return null
    }
  }
)

/** @returns {AsyncThunk} */
export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ body, id }, { dispatch }) => {
    const route = `${settings.API_ROUTES.TRANSACTIONS}/${id}`
    try {
      const response = await http.put(route, body)
      toast.success(i18n.t("transactions.message.updated"))
      dispatch(fetchPortfolio())
      return response.data
    } catch (e) {
      const { data } = e.response
      toast.error(data?.message || i18n.t("transactions.message.notUpdated"))
      return null
    }
  }
)

/** @returns {AsyncThunk} */
export const removeTransaction = createAsyncThunk(
  "transactions/remove",
  async (id, { dispatch }) => {
    const route = `${settings.API_ROUTES.TRANSACTIONS}/${id}`
    const response = await http.delete(route)
    if (response.data) {
      toast.success(i18n.t("transactions.message.removed"))
      dispatch(fetchPortfolio())
      return id
    }
    toast.error(t("transactions.message.notRemoved"))
    return null
  }
)

/**
 * @type {{
 * loading: Boolean,
 * data: Transaction[]
 * }}
 */
const initialState = {
  loading: false,
  data: []
}

const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, { payload }) => {
      state.data = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearTransactions: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(addTransaction.fulfilled, state => {
        state.loading = false
      })
      .addCase(addTransaction.pending, state => {
        state.loading = true
      })
      .addCase(addTransaction.rejected, state => {
        state.loading = false
      })
      .addCase(removeTransaction.fulfilled, (state, { payload }) => {
        state.data = state.data.filter(t => t._id !== payload)
      })
      .addCase(updateTransaction.pending, state => {
        state.loading = true
      })
      .addCase(updateTransaction.rejected, state => {
        state.loading = false
      })
      .addCase(updateTransaction.fulfilled, (state, { payload }) => {
        state.loading = false
      })
  }
})

export const { setTransactions, setLoading, clearTransactions } =
  transactions.actions

export default transactions.reducer
