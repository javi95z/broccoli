import { combineReducers } from "redux"
import auth from "./auth"
import transactions from "./transactions"

const rootReducer = combineReducers({ auth, transactions })

export default rootReducer
