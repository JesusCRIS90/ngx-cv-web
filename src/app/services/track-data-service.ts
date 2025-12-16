import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisitorInfo } from '../interfaces';

const GEO_API = 'https://ipapi.co/json/'; // Example (replace in prod)
const BACKEND_API = 'https://your-api.com/track';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  constructor(private http: HttpClient) {}

  async trackVisitor(): Promise<void> {
    try {
      const geoData: any = await fetch(GEO_API).then((res) => res.json());

      const visitorInfo: VisitorInfo = {
        city: geoData.city || 'Unknown',
        country: geoData.country_name || 'Unknown',
        region: geoData.region || 'Unknown',
        timestamp: this.getTimestamp(),
        browser: this.getBrowser(),
        deviceType: this.getDeviceType(),
        navigatorResolution: this.getNvigatorResolution(),
        language: this.getLanguage(),
        platform: this.getPlatform(),
      };

      this.sendToBackend(visitorInfo);
    } catch (error) {
      console.error('Tracking failed', error);
    }
  }

  private sendToBackend(data: VisitorInfo): void {
    console.log('Sending visitor info to backend:', data);

    // this.http.post(this.BACKEND_API, data).subscribe({
    //   error: err => console.error('Backend error', err)
    // });
  }

  private getTimestamp(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');

    const minutes = now.getMinutes();
    const bucketedMinutes = Math.floor(minutes / 15) * 15;
    const minute = String(bucketedMinutes).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  private getNvigatorResolution(): string {
    return `${window.innerWidth}x${window.innerHeight}`;
  }

  private getBrowser(): string {
    console.log(navigator, window);

    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Brave')) return 'Brave';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    return 'Unknown';
  }

  private getDeviceType(): 'Mobile' | 'Tablet' | 'Desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  }

  // private getDeviceModel(): string | null {
  //   const ua = navigator.userAgent;
  //   const match = ua.match(/\((.*?)\)/);
  //   return match ? match[1] : null;
  // }

  private getLanguage(): string {
    return navigator.language;
  }

  private getPlatform(): string {
    return navigator.platform || 'Unknown';
  }
}
