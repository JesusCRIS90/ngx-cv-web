import { Component, HostListener, Output, EventEmitter, OnDestroy, input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

export interface ScrollYEventInfo {
  yPosPixel: number,
  yPosPercentage: number,
  yMaxScrollSizePixel: number,
  direction: 'up' | 'down'
}

@Component({
  selector: 'scroll-tracker',
  imports: [],
  template: '',
})
export class ScrollTrackerComponent {

  @Output() scrollYEventEmitted = new EventEmitter<ScrollYEventInfo>();

  debounceTimer = input<number>(0);

  private lastScrollY = 0;
  private scrollSubject = new Subject<number>();

  constructor() {
    this.configureDebouncing();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.scrollSubject.next(scrollY);
  }

  ngOnDestroy(): void {
    this.scrollSubject.complete(); // Clean up on component destroy
  }

  protected configureDebouncing() {
    this.scrollSubject
      .pipe(debounceTime(this.debounceTimer()))
      .subscribe((currentY) => {

        // Get Maximum Scroll Size
        const maxScrollable =
          document.documentElement.scrollHeight - window.innerHeight;

        // Calculate Percentage
        const percentage =
          maxScrollable > 0
            ? Math.min(100, Math.max(0, (currentY / maxScrollable) * 100))
            : 0;

        // Calculate direction
        const direction: 'up' | 'down' =
          currentY > this.lastScrollY ? 'down' : 'up';

        // Update YScroll Pos in Pixels
        this.lastScrollY = currentY;

        this.scrollYEventEmitted.emit({
          yPosPixel: currentY,
          yPosPercentage: percentage,
          direction: direction,
          yMaxScrollSizePixel: maxScrollable
        });

      });
  }
}
