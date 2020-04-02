import axios from "axios";
const API = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;
export default axios.create({
  baseURL: API,
  headers: { "X-Requested-With": "XMLHttpRequest" },
  timeout: 1000,
  responseType: "json",
  responseEncoding: "utf8"
});
