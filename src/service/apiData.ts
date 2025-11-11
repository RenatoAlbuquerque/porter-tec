import axios from "axios";

export default function apiData() {
  const BASE_DOMAIN = process.env.NEXT_PUBLIC_DATE;

  const api = axios.create({
    baseURL: "https://randomuser.me/api/",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  return api;
}
