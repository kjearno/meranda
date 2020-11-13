import axios from "axios";
import { config } from "@src/config";

const instance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true
});

instance.interceptors.response.use(
  response => {
    return response;
  },

  error => {
    if (error.response?.status === 404) {
      error.name = "NotFoundError";
    }

    return Promise.reject(error);
  }
);

export { instance as axios };
