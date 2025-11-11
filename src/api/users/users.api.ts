import apiData from "@/service/apiData";
import { RandomUserResponse } from "./users.types";

const api = apiData();
export interface RandomUserParams {
  results?: number;
  gender?: "male" | "female";
  nat?: string;
  page?: number;
  seed?: string;
  inc?: string;
  exc?: string;
  format?: "json" | "pretty" | "csv" | "yaml" | "xml";
}

export const fetchRandomUsers = async (
  params: RandomUserParams = {},
): Promise<RandomUserResponse> => {
  const { data } = await api.get<RandomUserResponse>("/", { params });
  return data;
};
