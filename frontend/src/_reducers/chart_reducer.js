import { GET_CHART_DATES, GET_CHART_CODE } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CHART_DATES:
      return { ...state, chartDates: action.payload };
      break;

    case GET_CHART_CODE:
      return { ...state, chartCode: action.payload };
      break;

    default:
      return state;
  }
}
