import type { UrlRequest, UrlResponse } from ".";

const BASE_URL = "";

const requests = {
  shorten: "/api/shorten",
  redirect: "/api/",
};

export const get = async (url: string) => {
  const response = await fetch(BASE_URL + url);
  return response.json();
};

export const post = async (url: string, data: UrlRequest) => {
  const response = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("response: ", response);
  return response.json();
};

export const shortenUrl = async (data: UrlRequest): Promise<UrlResponse> => {
  return post(requests.shorten, data);
};

export const redirectUrl = async (url: string) => {
  return get(requests.redirect + url);
};
