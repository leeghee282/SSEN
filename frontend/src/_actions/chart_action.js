import Axios from "axios";
import {
  GET_CHART_DATES,
  GET_CHART_CODE,
  GET_DATA,
  GET_KEYWORDS,
  GET_NEWS,
  DO_FN,
} from "./types";
import { baseURL, baseNewsURL } from "../api/index";

const axios = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

const newsAxios = Axios.create({
  baseURL: baseNewsURL,
  headers: {
    "Content-type": "application/json",
  },
});

export function getChartDates(dataToSubmit) {
  const request = {
    startDate: dataToSubmit.startDate,
    endDate: dataToSubmit.endDate,
  };

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

export function getData(dataToSubmit) {
  const request = axios
    .get(
      `/api/v1/curr/period/${dataToSubmit.startDate}/${dataToSubmit.endDate}/${dataToSubmit.code}`
    )
    .then((response) => response.data);

  return {
    type: GET_DATA,
    payload: request,
  };
}

export function getKeywords(dataToSubmit) {
  const request = newsAxios
    .get(`/news/keyword/${dataToSubmit.startDate}/${dataToSubmit.endDate}`)
    .then((response) => response.data);

  return {
    type: GET_KEYWORDS,
    payload: request,
  };
}

export function getNews(dataToSubmit) {
  const request = newsAxios
    .get(
      `/news/search/${dataToSubmit.keyword}/${dataToSubmit.startDate}/${dataToSubmit.endDate}`
    )
    .then((response) => response.data);

  return {
    type: GET_NEWS,
    payload: request,
  };
}

export function doFn() {
  return {
    type: DO_FN,
  };
}
