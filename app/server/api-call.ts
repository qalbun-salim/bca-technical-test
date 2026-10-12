import { ApiDomainConfig, Domain } from "./routes";

export function callApi<T = unknown>(
  domain: Domain,
  url: `/${string}`,
  optionInput?: RequestInit,
): Promise<T> {
  const config = ApiDomainConfig[domain];
  const headers = new Headers(config.headers);
  new Headers(optionInput?.headers).forEach((value, key) => {
    headers.set(key, value);
  });

  return fetch(`${config.url}${url}`, {
    ...optionInput,
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error during API call:", error);
      throw error;
    });
}
