import {
  GET_CURRENCY_CODE,
  GET_DATE,
  GET_EXCHANGE_RATE,
  GET_BANKS_INFO,
} from "../_actions/types";

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate) - 1);

const INITIAL_STATE = {
  currencyCode: "USD",
  exchangeDate: yesterday,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CURRENCY_CODE:
      return { ...state, currencyCode: action.payload };
      break;

    case GET_DATE:
      return { ...state, exchangeDate: action.payload };
      break;

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
