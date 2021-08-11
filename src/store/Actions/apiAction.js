import axios from "axios";
import { getURL } from "../utils/util";
const API_ENDPOINT = getURL();

export function postRequest(url, data, config) {
  return new Promise((resolve, reject) => {
    if (!config) {
      config = {
        headers: {
          "content-type": "application/json",
        },
      };
    }
    console.log(`API ENDPOI NT  ${API_ENDPOINT}`);
    return axios
      .post(`${API_ENDPOINT}/${url}`, data, config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function postRequestWithAuth(url, data, config) {
  if (!config) {
    config = {
      headers: {
        "content-type": "application/json",
      },
    };
  }
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    return axios
      .post(`${API_ENDPOINT}/${url}`, data, config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
