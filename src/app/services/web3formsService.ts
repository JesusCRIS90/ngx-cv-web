import { environment } from '../../environments/environment';

const pubKey = environment.web3formPubKey;

export interface Web3FormResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class Web3FormSubmittingService {
  private static get FORM_URL(): string {
    return `https://api.web3forms.com/submit`;
  }

  /**
   * Generic submit method
   * Forces the caller to pass <T>
   */
  static async Submit<T extends object>(
    data: T
  ): Promise<{ ok: boolean; response?: Web3FormResponse }> {
    try {
      
      const payload = {
        access_key: pubKey,
        ...data
      }

      // console.log(`payload:`, payload);

      const response = await fetch(this.FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        console.error('Web3Form error:', json);
        return { ok: false, response: json };
      }

      return { ok: true, response: json };

    } catch (error) {
      console.error('Network or Web3Form error:', error);
      return { ok: false };
    }
  }
}
