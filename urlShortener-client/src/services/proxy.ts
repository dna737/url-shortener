import type { UrlRequest, UrlResponse } from ".";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000";

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
  const response = await fetch(BACKEND_URL + url, {
    redirect: "manual",
  });
  return response.json();
};

export const post = async (url: string, data: UrlRequest) => {
  const response = await fetch(BACKEND_URL + url, {
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
  const response = await fetch(BACKEND_URL + requests.redirect + url);
  const data = await response.json();
  
  return data;
};
