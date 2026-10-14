import axios, { type AxiosRequestConfig } from "axios";
import { ApiDomainConfig, Domain } from "./routes";

export class ApiError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP error with status: ${status}`);
    this.name = "ApiError";
  }
}

export function callApi<T = unknown>(
  domain: Domain,
  url: `/${string}`,
  optionInput?: Omit<AxiosRequestConfig, "url" | "baseURL">,
): Promise<T> {
  const config = ApiDomainConfig[domain];
  const client = axios.create({
    baseURL: config.url,
    headers: Object.fromEntries(new Headers(config.headers)),
  });

  return client.request<T>({
    ...optionInput,
    url,
    responseType: "json",
    transitional: { silentJSONParsing: false },
  })
    .then((response) => response.data)
    .catch((error) => {
      const apiError = axios.isAxiosError(error) && error.response
        ? new ApiError(error.response.status)
        : error;
      console.error("Error during API call:", apiError instanceof Error
        ? apiError.message
        : "Unknown API error");
      throw apiError;
    });
}
