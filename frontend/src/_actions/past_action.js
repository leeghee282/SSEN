import Axios from "axios";
import {
  GET_PAST_DATALIST,
  GET_PAST_DATA,
  GET_PAST_KEYWORDS,
  GET_PAST_NEWS,
  GET_PAST_CURR_DATA,
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

export function getPastDatalist(dataToSubmit) {
  // const pastData = [];
  // dataToSubmit.map((data) => {
  //   var addPastData = {
  //     keyword: data.keyword,
  //     count: data.count,
  //   };
  //   return pastData.push(addPastData);
  // });

  const request = newsAxios
    .post("/news/past", dataToSubmit)
    .then((response) => response.data);

  return {
    type: GET_PAST_DATALIST,
    payload: request,
  };
}

export function getPastData(dataToSubmit) {
  const request = dataToSubmit;

  return {
    type: GET_PAST_DATA,
    payload: request,
  };
}

export function getPastKeywords(dataToSubmit) {
  const request = newsAxios
    .get(`/news/keyword/${dataToSubmit.startDate}/${dataToSubmit.endDate}`)
    .then((response) => response.data);

  return {
    type: GET_PAST_KEYWORDS,
    payload: request,
  };
}

export function getPastNews(dataToSubmit) {
  const request = newsAxios
    .get(`/news/search/${dataToSubmit.keyword}`)
    .then((response) => response.data);

  return {
    type: GET_PAST_NEWS,
    payload: request,
  };
}

export function getPastCurrData(dataToSubmit) {
  const request = axios
    .get(`/api/v1/curr/one/${dataToSubmit.date}/${dataToSubmit.code}`)
    .then((response) => response.data);

  return {
    type: GET_PAST_CURR_DATA,
    payload: request,
  };
}
