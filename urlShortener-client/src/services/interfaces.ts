export interface UrlRequest {
  original_url: string;
}

export interface UrlResponse {
  shortenedUrl: string;
  originalUrl: string;
  success: boolean;
  message: string;
}

export interface PageDetailsResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt?: string;
  };
}

export interface UrlStatsResponse {
  success: boolean;
  message: string;
  data?: {
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
  };
}
