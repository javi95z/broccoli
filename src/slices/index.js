import { combineReducers } from "redux"
import auth from "./auth"
import holdings from "./holdings"
import portfolio from "./portfolio"
import transactions from "./transactions"

const rootReducer = combineReducers({ auth, holdings, portfolio, transactions })

export default rootReducer
