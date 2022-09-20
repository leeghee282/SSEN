import axios from "axios";
import { GET_EXCHANGE_RATE, GET_BANK_INFOS } from "./types";

export function getExchangeRate(dataToSubmit) {
  const request = axios
    .post("/api/curr", dataToSubmit)
    .then((response) => response.data);

  return {
    type: GET_EXCHANGE_RATE,
    payload: request,
  };
}

export function getBankInfos(dataToSubmit) {
  const request = axios
    .post("/api/country", dataToSubmit)
    .then((response) => response.data);

  return {
    type: GET_BANK_INFOS,
    payload: request,
  };
}
