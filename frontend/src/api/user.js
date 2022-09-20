import Axios from "axios";
import { baseURL } from "./index";

const urls = {
  Login: "/user/login",
};

const axios = Axios.create({
  baseURL: baseURL,
});

axios.interceptors.request.use();
