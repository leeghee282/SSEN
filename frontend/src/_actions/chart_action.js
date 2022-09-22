import Axios from "axios";
import { GET_CHART_DATES, GET_CHART_CODE } from "./types";
import { baseURL } from "../api/index";

const axios = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export function getChartDates(dataToSubmit) {
  const request = axios
    .get(
      `/api/v1/curr/period/${dataToSubmit.startDate}/${dataToSubmit.endDate}/${dataToSubmit.code}`
    )
    .then((response) => response.data);

  return {
    type: GET_CHART_DATES,
    payload: request,
  };
}

export function getChartCode(dataToSubmit) {
  const request = dataToSubmit.code;

  return {
    type: GET_CHART_CODE,
    payload: request,
  };
}
