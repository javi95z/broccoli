import { combineReducers } from "redux"
import auth from "./auth"
import positions from "./positions"

const rootReducer = combineReducers({ auth, positions })

export default rootReducer
