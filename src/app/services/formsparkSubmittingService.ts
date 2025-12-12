import { environment } from '../../environments/environment';

// const formsparkId = 'fHTzX5VOC'
const formsparkId = environment.formsparkId;

export class FormsparkSubmittingService {
  private static get FORM_URL(): string {
    console.log(`public-key${formsparkId}`);
    return `https://submit-form.com/${formsparkId}`;
  }

  /**
   * Generic submit method
   * Forces the caller to pass <T>
   */
  static async Submit<T extends object>(
    data: T
  ): Promise<{ ok: boolean; response?: any }> {
    try {
      console.log(`payload:`, data);
      const response = await fetch(this.FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Formspark error:', response.statusText);
        return { ok: false, response };
      }

      return { ok: true, response: await response.json() };
    } catch (error) {
      console.error('Network or Formspark error:', error);
      return { ok: false };
    }
  }
}
