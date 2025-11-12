import axios from "axios";

export default function apiData() {
  const api = axios.create({
    baseURL: "https://randomuser.me/api/",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  return api;
}
