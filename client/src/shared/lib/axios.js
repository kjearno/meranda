import axios from "axios";

const instance = axios.create({
  baseURL: "https://meranda-14351.herokuapp.com/api",
  withCredentials: true,
});

export { instance as axios };
