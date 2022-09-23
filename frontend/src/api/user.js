import Axios from "axios";
import { baseURL } from "./index";

const urls = {
  Login: "/api/v1/user/login",
};

const axios = Axios.create({
  baseURL: baseURL,
});

axios.interceptors.request.use();

export default axios;
