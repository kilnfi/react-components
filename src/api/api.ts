import axios, { Method } from "axios";

type Header = {
  "Authorization": string;
  "Content-Type": string;
  "X-Kiln-Organization"?: string;
  "X-Kiln-Account"?: string;
}

type FetcherOption = {
  apiUrl: string;
  apiKey: string;
  organizationId?: string;
  accountId?: string;
}

// Fetcher function used by SWR by default to make requests on our API
export const fetcher = (url: string, options: FetcherOption) => {
  let headers: Header = {
    Authorization: `Bearer ${options.apiKey}`,
    "Content-Type": "application/json",
  };

  if (options?.organizationId) {
    headers["X-Kiln-Organization"] = options.organizationId;
  }

  if (options?.accountId) {
    headers["X-Kiln-Account"] = options.accountId;
  }

  return axios
    .get(`${options.apiUrl}${url}`, { headers })
    .then(res => res.data)
    .catch((err) => console.error(err));
};

// API wrapper function used to make POST, PUT and PATCH requests
const api = async <T>(method: Method, url: string, options: FetcherOption, data?: any): Promise<T> => {
  let headers: Header = {
    Authorization: `Bearer ${options.apiKey}`,
    "Content-Type": "application/json",
  };

  if (options?.organizationId) {
    headers["X-Kiln-Organization"] = options.organizationId;
  }

  if (options?.accountId) {
    headers["X-Kiln-Account"] = options.accountId;
  }

  const res = await axios({
    method,
    url: `${options.apiUrl}${url}`,
    headers,
    data,
  });
  return res.data;
};

export default api;
