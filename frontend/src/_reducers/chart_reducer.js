import { GET_CHART_DATES, GET_CHART_CODE, GET_DATA } from "../_actions/types";

const today = new Date();
const dayOfToday = today.getDate();
const lastWeek = today.setDate(dayOfToday - 7);
const startDate = new Date(lastWeek);
const endDate = new Date();

const INITIAL_STATE = {
  chartDates: { startDate: startDate, endDate: endDate },
  chartCode: "USD",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CHART_DATES:
      return { ...state, chartDates: action.payload };
      break;

    case GET_CHART_CODE:
      return { ...state, chartCode: action.payload };
      break;

    case GET_DATA:
      return { ...state, data: action.payload };
      break;

    default:
      return state;
  }
}
