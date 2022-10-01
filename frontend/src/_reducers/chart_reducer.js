import {
  GET_CHART_DATES,
  GET_CHART_CODE,
  GET_DATA,
  GET_KEYWORDS,
  GET_NEWS,
  DO_FN,
  GET_CHART_DETAIL_DATE,
  DO_DETAIL_FN,
  SET_WORDCLOUD_DATA,
} from "../_actions/types";

const today = new Date();
const dayOfToday = today.getDate();
const lastWeek = today.setDate(dayOfToday - 7);
const startDate = new Date(lastWeek);
const endDate = new Date();

const INITIAL_STATE = {
  chartDates: { startDate: startDate, endDate: endDate },
  chartCode: "USD",
  doing: 0,
  chartDetailDate: { startDate: startDate, endDate: endDate },
  doDetail: 0,
  news: [],
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

    case GET_KEYWORDS:
      return { ...state, keywords: action.payload };
      break;

    case GET_NEWS:
      return { ...state, news: action.payload };
      break;

    case DO_FN:
      return { ...state, doing: state.doing + 1 };
      break;

    case GET_CHART_DETAIL_DATE:
      return { ...state, chartDetailDate: action.payload };
      break;

    case DO_DETAIL_FN:
      return { ...state, doDetail: state.doDetail + 1 };
      break;

    case SET_WORDCLOUD_DATA:
      return { ...state, wordcloudData: action.payload };
      break;

    default:
      return state;
  }
}
