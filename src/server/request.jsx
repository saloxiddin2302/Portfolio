import axios from "axios";
import { ENDPOINT, TOKEN } from "../const";
// import Cookies from "js-cookie";

const token = localStorage.getItem(TOKEN);

export const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  // headers: {
  //   Authorization: Cookies.get(TOKEN) ? "Bearer " + Cookies.get(TOKEN) : null,
  // },
  headers: { Authorization: token ? `Bearer ${token}` : "" },
});


export const requestImage = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: token ? `Bearer ${token}` : "",
  },
});
