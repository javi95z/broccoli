import { combineReducers } from "redux"
import auth from "./auth"
import holdings from "./holdings"
import transactions from "./transactions"

const rootReducer = combineReducers({ auth, holdings, transactions })

export default rootReducer
