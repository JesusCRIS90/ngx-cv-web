import {
  Directive,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[dirAppEndlessTimer]',
  exportAs: 'dirAppEndlessTimer'
})
export class EndlessTimerDirective implements OnInit, OnDestroy {
  @Input() intervalMs: number = 3000;
  @Output() tick = new EventEmitter<void>();

  private timerId: any;

  ngOnInit(): void {
    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  start(): void {
    // Ensure no duplicate intervals
    this.stop();

    this.timerId = setInterval(() => {
      this.tick.emit();
    }, this.intervalMs);

  }

  stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  reset(): void {
    this.start();
  }
}
