import type { UrlRequest } from ".";

const requests = {
  shorten: "/api/shorten",
  redirect: "/api/",
};

export const get = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export const post = async (url: string, data: UrlRequest) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const shortenUrl = async (data: UrlRequest) => {
  return post(requests.shorten, data);
};

export const redirectUrl = async (url: string) => {
  return get(requests.redirect + url);
};
