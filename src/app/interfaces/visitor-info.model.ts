export interface VisitorInfo {
  city: string;
  region: string;
  country: string;
  timestamp: string;
  browser: string;
  language: string;
  deviceType: 'Mobile' | 'Tablet' | 'Desktop';
  clientResolution: string;
  platform: string;
  wasError: boolean;
  errorMessage: string;
  pageURL: string;
}
