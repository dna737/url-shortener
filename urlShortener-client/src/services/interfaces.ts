export interface UrlRequest {
  original_url: string;
}

export interface UrlResponse {
  shortenedUrl: string;
  originalUrl: string;
  success: boolean;
  message: string;
}
