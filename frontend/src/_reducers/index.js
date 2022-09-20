import { combineReducers } from "redux";
import exchangecalc from "./exchange_reducer";

const rootReducer = combineReducers({
  exchangecalc,
});

export default rootReducer;
