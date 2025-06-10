import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

export const instance = axios.create({
  baseURL: "http://localhost:8080",
});
export const http = setupCache(instance);

export function searchLocation(keyword: string, subtype: string) {
  return http.get(
    `/airports?subtype=${subtype}&keyword=${keyword}&pageSize=5&offset=0`,
  );
}
