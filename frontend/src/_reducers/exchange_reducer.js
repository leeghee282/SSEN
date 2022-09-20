import { GET_EXCHANGE_RATE, GET_BANKS_INFO } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_EXCHANGE_RATE:
      return { ...state, exchangeRate: action.payload };
      break;

    case GET_BANKS_INFO:
      return { ...state, banksInfo: action.payload };
      break;

    default:
      return state;
  }
}
