import { Directive, ElementRef, EventEmitter, input, Output, effect } from '@angular/core';

import { ScrollYEventInfo } from '../navMenu'

@Directive({
  selector: '[dirSectionYscrollTracker]',
  standalone: true,
})
export class SectionTrackerDirective {

  dirProp_sectionId = input.required<string>();
  dirProp_yScrollEvent = input.required<ScrollYEventInfo>();

  @Output() dirEvt_sectionVisible = new EventEmitter<string>();


  constructor(public el: ElementRef) {
    effect((onCleanup) => {

      if (this.checkYScrollEnterOnSection()) {
        this.dirEvt_sectionVisible.emit(this.dirProp_sectionId());
      }

      // ✅ Cleanup logic runs before the effect re-runs or when directive is destroyed
      onCleanup(() => {
        // console.log(`Cleaning up scroll tracking for section: ${this.sectionId()}`);
        // If you had any subscriptions, timeouts, or DOM observers, clean them here
      });

    });

  }

  getSectionId(): string {
    return this.dirProp_sectionId();
  }


  protected getYScrollPos(): number {
    return this.dirProp_yScrollEvent().yPosPixel;
  }

  private checkYScrollEnterOnSection(): boolean {

    const top = this.el.nativeElement.offsetTop;
    const height = this.el.nativeElement.offsetHeight;
    const bottom = top + height;

    if (this.getYScrollPos() >= top && this.getYScrollPos() < bottom) {
      return true;
    }

    return false;
  }
}
