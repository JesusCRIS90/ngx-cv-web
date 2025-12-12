import { AfterViewInit, Component, ElementRef, EventEmitter, input, Output, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'h-captcha',
  imports: [],
  templateUrl: './h-captcha.html',
  styleUrl: './h-captcha.css',
  standalone: true,
})
export class HCaptcha implements AfterViewInit {
  @ViewChild('captchaContainer', { static: true })
  captchaContainer!: ElementRef<HTMLDivElement>;

  @Output() verified = new EventEmitter<string>();

  siteKey = input.required<string>();

  widgetId: number | null = null;

  // Error signal (reactive, automatically updates template)
  errorMessage = signal<string | null>(null);

  ngAfterViewInit(): void {
    if (!(window as any).hcaptcha) {
      this.setError('hCaptcha script could not be loaded.');
      return;
    }

    this.widgetId = (window as any).hcaptcha.render(
      this.captchaContainer.nativeElement,
      {
        sitekey: this.siteKey(),
        callback: (token: string) => {
          this.clearError(); // clear any previous error
          this.verified.emit(token);
        },
        'expired-callback': () => {
          this.setError('Captcha expired. Please try again.');
          this.verified.emit('');
        },
        'error-callback': () => {
          this.setError('Captcha failed to load. Please retry.');
        },
      }
    );
  }

  reset(): void {
    if (this.widgetId !== null) {
      (window as any).hcaptcha.reset(this.widgetId);
    }
    this.clearError();
  }

  /** Public API — Set error message */
  setError(message: string) {
    this.errorMessage.set(message);
  }

  /** Public API — Clear error message */
  clearError() {
    this.errorMessage.set(null);
  }
}
