import {
  GET_PAST_DATALIST,
  GET_PAST_DATA,
  GET_PAST_KEYWORDS,
  GET_PAST_NEWS,
  GET_PAST_CURR_DATA,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PAST_DATALIST:
      return { ...state, pastDatalist: action.payload };
      break;

    case GET_PAST_DATA:
      return { ...state, pastData: action.payload };
      break;

    case GET_PAST_KEYWORDS:
      return { ...state, pastKeywords: action.payload };

    case GET_PAST_NEWS:
      return { ...state, pastNews: action.payload };

    case GET_PAST_CURR_DATA:
      return { ...state, pastCurrData: action.payload };

    default:
      return state;
  }
}
