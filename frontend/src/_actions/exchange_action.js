import Axios from "axios";
import {
  GET_CURRENCY_CODE,
  GET_DATE,
  GET_EXCHANGE_RATE,
  GET_BANKS_INFO,
} from "./types";
import { baseURL } from "../api/index";

const axios = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export function getCurrencyCode(dataToSubmit) {
  const request = dataToSubmit;

  return {
    type: GET_CURRENCY_CODE,
    payload: request,
  };
}

export function getDate(dataToSubmit) {
  const request = {
    date: dataToSubmit.date,
  };

  return {
    type: GET_DATE,
    payload: request,
  };
}

export function getExchangeRate(dataToSubmit) {
  const request = axios
    .get(`/api/v1/curr/one/${dataToSubmit.date}/${dataToSubmit.code}`)
    .then((response) => response.data);

  return {
    type: GET_EXCHANGE_RATE,
    payload: request,
  };
}

export function getBanksInfo(dataToSubmit) {
  const request = axios
    .get(`/api/v1/commission/${dataToSubmit.code}`)
    .then((response) => response.data);

  return {
    type: GET_BANKS_INFO,
    payload: request,
  };
}
