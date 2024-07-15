import { RequestInit } from "next/dist/server/web/spec-extension/request";

interface CustomReuqest extends RequestInit {
  body: any;
}

const ConfigHttp = async <ResType>(method: string, URL: string, option?: CustomReuqest) => {
  const body = JSON.stringify(option?.body);
  const headers = option?.headers;
  const credentials = option?.credentials;
  const response = await fetch(URL, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body,
    credentials,
  });
  const result: ResType = await response.json();
  // @ts-ignore
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const httpRequest = {
  get<ResType>(URL: string, option: CustomReuqest) {
    return ConfigHttp<ResType>("GET", URL, option);
  },
  put<ResType>(URL: string, option: CustomReuqest) {
    return ConfigHttp<ResType>("PUT", URL, option);
  },
  post<ResType>(URL: string, option: CustomReuqest) {
    return ConfigHttp<ResType>("POST", URL, option);
  },
  delete<ResType>(URL: string, option: CustomReuqest) {
    return ConfigHttp<ResType>("DELETE", URL, option);
  },
};
export default httpRequest;
