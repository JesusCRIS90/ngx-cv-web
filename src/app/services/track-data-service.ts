import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { VisitorInfo } from '../interfaces';

import { createClient } from '@supabase/supabase-js';

const GEO_API = 'https://ipapi.co/json/';

const SUPABASE_URL = 'https://rtpkqbswvbcjicsjgwfs.supabase.co';
const SUPABASE_PUBLIC_KEY = 'sb_publishable_tGSQlXKU7TQJvWDUuz0nvw_7POwoHT2';

// const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

const RESPONSIVE_PREFIX = 'responsive-schema-';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  private supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  constructor(private http: HttpClient) {}

  async trackVisitor(): Promise<void> {
    console.log('Tracking visitor...');

    let data: VisitorInfo;

    try {
      const geoData = await firstValueFrom(this.http.get(GEO_API));
      data = this.getValidVisitorInfo(geoData);
    } catch (error) {
      console.error('Geo API failed', error);
      data = this.getInvalidVisitorInfo(error);
    }

    await this.sendToBackend(data);
  }

  private async sendToBackend(data: VisitorInfo): Promise<void> {
    try {
      const { error } = await this.supabase.from('cv_metrics').insert(data);

      if (error) {
        console.error('Supabase insert failed', error);
      }
    } catch (err) {
      console.error('Unexpected backend error', err);
    }
  }

  private getValidVisitorInfo(geoData: any): VisitorInfo {
    return {
      city: geoData.city || 'Unknown',
      country: geoData.country_name || 'Unknown',
      region: geoData.region || 'Unknown',
      timestamp: this.getTimestamp(),
      browser: this.getBrowser(),
      deviceType: this.getDeviceType(),
      clientResolution: this.getResponsiveSchema() || 'Unknown',
      language: this.getLanguage(),
      platform: this.getPlatform(),
      wasError: false,
      errorMessage: '',
      pageURL: window?.location?.href ?? 'Unknown',
    };
  }

  private getInvalidVisitorInfo(error: any): VisitorInfo {
    const message =
      typeof error === 'string'
        ? error
        : error?.message ?? error?.statusText ?? 'Unknown error';

    return {
      city: 'Unknown',
      country: 'Unknown',
      region: 'Unknown',
      timestamp: this.getTimestamp(),
      browser: this.getBrowser(),
      deviceType: this.getDeviceType(),
      clientResolution: this.getResponsiveSchema() || 'Unknown',
      language: this.getLanguage(),
      platform: this.getPlatform(),
      wasError: true,
      errorMessage: message,
      pageURL: window?.location?.href ?? 'Unknown',
    };
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

  private getBrowser(): string {
    if (typeof navigator === 'undefined') return 'Unknown';

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

  private getLanguage(): string {
    return navigator.language;
  }

  private getPlatform(): string {
    return navigator.platform || 'Unknown';
  }

  private getResponsiveSchema(doc: Document = document): string | null {
    const body = doc.body;
    if (!body) {
      return null;
    }

    // find the class that starts with "responsive-schema-"
    const responsiveClass = Array.from(body.classList).find((c) =>
      c.startsWith(RESPONSIVE_PREFIX)
    );

    if (!responsiveClass) {
      return null;
    }

    // extract the "defined-schema" part
    const definedPart = responsiveClass.slice(RESPONSIVE_PREFIX.length);

    return definedPart || null;
  }
}
