import axios from "axios";

export const Api = axios.create({
  baseURL: "/login/oauth/authorize",
  responseType: "json",
});
