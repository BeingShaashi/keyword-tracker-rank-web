import axios from "axios";

let API_URL = "http://localhost:3001/api/";

const api = {};

api.get = (uri, params) => {
  return axios
    .get(API_URL + uri, {
      headers: {
        "Content-Type": "application/json",
      },
      params,
    })
    .then(async (response) => {
      return response.data;
    });
};

export default api;
