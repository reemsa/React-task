import axios from "axios";

const apiBaseUrl = "https://swapi.dev/api";

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
});

export default api;
