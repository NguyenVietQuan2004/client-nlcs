import { RequestInit } from "next/dist/server/web/spec-extension/request";

interface CustomReuqest extends RequestInit {
  body: BodyInit;
}

const ConfigHttp = async <ResType>(method: string, URL: string, option: CustomReuqest) => {
  const fullURL = URL;
  const body = JSON.stringify(option.body);
  const headers = option.headers;

  const response = await fetch(fullURL, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body,
  });
  const result: ResType = await response.json();
  // @ts-ignore
  if (!response.ok) {
    throw result;
  }
  return result;
};

const httpRequest = {
  get<ResType>(method: string, URL: string, option: CustomReuqest) {
    return ConfigHttp<ResType>(method, URL, option);
  },
};
export default httpRequest;
