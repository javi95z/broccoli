import i18n from "i18next"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchPortfolio } from "./portfolio"
import { fetchHoldings } from "./holdings"
import { http, toast } from "../services"
import settings from "../settings.json"

/** @returns {AsyncThunk} */
export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async () => {
    const route = settings.API_ROUTES.TRANSACTIONS
    const response = await http.get(route)
    return response.data
  }
)

/** @returns {AsyncThunk} */
export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (body, { dispatch }) => {
    const route = settings.API_ROUTES.TRANSACTIONS
    const response = await http.post(route, body)
    if (response.data) {
      toast.success(i18n.t("transactions.message.added"))
      await Promise.all([
        dispatch(fetchTransactions()),
        dispatch(fetchPortfolio()),
        dispatch(fetchHoldings())
      ])
      return response.data
    }
    return null
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
      dispatch(fetchHoldings())
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
    setData: (state, { payload }) => {
      state.data = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearTransactions: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
      })
      .addCase(fetchTransactions.pending, state => {
        state.loading = true
      })
      .addCase(fetchTransactions.rejected, state => {
        state.loading = false
      })
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
  }
})

export const { setData, setLoading, clearTransactions } = transactions.actions

export default transactions.reducer
