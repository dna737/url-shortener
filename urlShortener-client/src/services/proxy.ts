import type { UrlRequest, UrlResponse } from ".";

const BASE_URL = "";

// Get the current host and port dynamically
const getCurrentHost = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin; // This will be "http://localhost:5173" or "https://localhost:5174" etc.
  }
  // Fallback for SSR or when window is not available
  return "http://localhost:5173";
};

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
      "X-Forwarded-Host": getCurrentHost(),
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const shortenUrl = async (data: UrlRequest): Promise<UrlResponse> => {
  return post(requests.shorten, data);
};

export const redirectUrl = async (url: string) => {
  return get(requests.redirect + url);
};
