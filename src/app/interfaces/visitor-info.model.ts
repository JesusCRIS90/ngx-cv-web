export interface VisitorInfo {
  city: string;
  region: string;
  country: string;
  timestamp: string;
  browser: string;
  language: string;
  deviceType: 'Mobile' | 'Tablet' | 'Desktop';
  navigatorResolution: string;
  platform: string;
}
