import Axios from "axios";
import { GET_EXCHANGE_RATE, GET_BANKS_INFO } from "./types";
import { baseURL } from "../api/index";

const axios = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export function getExchangeRate(dataToSubmit) {
  const request = axios
    .get("/api/v1/currone", dataToSubmit)
    .then((response) => response.data);

  return {
    type: GET_EXCHANGE_RATE,
    payload: request,
  };
}

export function getBanksInfo(dataToSubmit) {
  const request = axios
    .get("/commission", dataToSubmit)
    .then((response) => response.data);

  return {
    type: GET_BANKS_INFO,
    payload: request,
  };
}
