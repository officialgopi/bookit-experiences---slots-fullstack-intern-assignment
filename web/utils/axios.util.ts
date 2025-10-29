import axios from "axios";

const api = axios.create({
  baseURL: process.env.V1_API_BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { api };
