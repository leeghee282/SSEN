import { createStore, combineReducers } from "redux";
import exchange_reducer from "./reducers/exchange_reducer";

const reducer = combineReducers({
  exchange_reducer,
});

const store = createStore(reducer);

export default store;
