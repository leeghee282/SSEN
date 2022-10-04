import { combineReducers } from "redux";
import exchangecalc from "./exchange_reducer";
import chart from "./chart_reducer";
import past from "./past_reducer";

const rootReducer = combineReducers({
  exchangecalcReducer: exchangecalc,
  chartReducer: chart,
  pastReducer: past,
});

export default rootReducer;
