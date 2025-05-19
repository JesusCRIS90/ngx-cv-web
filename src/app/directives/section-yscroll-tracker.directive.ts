import { Directive, ElementRef, EventEmitter, input, OnInit, Output, effect, DestroyRef, inject } from '@angular/core';

import { ScrollYEventInfo } from '../components'

@Directive({
  selector: '[sectionYscrollTracker]',
  standalone: true,
})
export class SectionTrackerDirective {

  sectionId = input.required<string>();
  yScrollEvent = input.required<ScrollYEventInfo>();

  @Output() sectionVisible = new EventEmitter<string>();

  // private destroyRef = inject(DestroyRef); // needed for cleanup


  constructor(private el: ElementRef) {
    effect((onCleanup) => {

      if (this.checkYScrollEnterOnSection()) {
        this.sectionVisible.emit(this.sectionId());
      }

      // ✅ Cleanup logic runs before the effect re-runs or when directive is destroyed
      onCleanup(() => {
        // console.log(`Cleaning up scroll tracking for section: ${this.sectionId()}`);
        // If you had any subscriptions, timeouts, or DOM observers, clean them here
      });

    });

  }


  protected getYScrollPos(): number {
    return this.yScrollEvent().yPosPixel;
  }

  private checkYScrollEnterOnSection(): boolean {

    const top = this.el.nativeElement.offsetTop;
    const height = this.el.nativeElement.offsetHeight;
    const bottom = top + height;

    // console.log({ top, height, bottom });

    if (this.getYScrollPos() >= top && this.getYScrollPos() < bottom) {
      return true;
    }

    return false;
  }
}
