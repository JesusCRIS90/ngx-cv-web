import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-hcaptcha',
  template: `<div #captchaContainer></div>`,
})
export class HcaptchaComponent implements AfterViewInit {
  @ViewChild('captchaContainer', { static: true })
  captchaContainer!: ElementRef<HTMLDivElement>;

  @Output() verified = new EventEmitter<string>();
  siteKey = input.required<string>();

  widgetId: number | null = null;

  ngAfterViewInit(): void {
    if (!(window as any).hcaptcha) {
      console.error('hCaptcha script not loaded');
      return;
    }

    this.widgetId = (window as any).hcaptcha.render(
      this.captchaContainer.nativeElement,
      {
        sitekey: this.siteKey(),
        callback: (token: string) => {
          this.verified.emit(token);
        },
        'expired-callback': () => {
          this.verified.emit('');
        },
      }
    );
  }

  reset(): void {
    if (this.widgetId !== null) {
      (window as any).hcaptcha.reset(this.widgetId);
    }
  }
}
