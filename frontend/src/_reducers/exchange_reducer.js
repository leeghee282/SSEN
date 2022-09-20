import { GET_EXCHANGE_RATE, GET_BANK_INFOS } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_EXCHANGE_RATE:
      return { ...state, exchangeRate: action.payload };
      break;

    case GET_BANK_INFOS:
      return { ...state, bankInfos: action.payload };
      break;

    default:
      return state;
  }
}
