import { combineReducers } from "redux";
import exchangecalc from "./exchange_reducer";
import chart from "./chart_reducer";

const rootReducer = combineReducers({
  exchangecalcReducer: exchangecalc,
  chartReducer: chart,
});

export default rootReducer;
