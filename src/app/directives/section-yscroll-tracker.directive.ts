import { Directive, ElementRef, EventEmitter, input, Output, OnDestroy } from '@angular/core';

import { ScrollTrackerService } from '../navMenu/services/scroll-tracker.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[dirSectionYscrollTracker]',
  standalone: true,
})
export class SectionTrackerDirective implements OnDestroy {

  @Output() dirEvt_sectionVisible = new EventEmitter<string>();
  dirProp_sectionId = input.required<string>();

  private sub = new Subscription();

  constructor(
    public el: ElementRef<HTMLElement>,
    private tracker: ScrollTrackerService
  ) {
    this.sub.add(
      this.tracker.scroll$.subscribe(info => {
        if (this.isInView( info.yPosPixel )) {
          this.dirEvt_sectionVisible.emit(this.dirProp_sectionId());
        }
      })
    );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSectionId(): string {
    return this.dirProp_sectionId();
  }

  private isInView(scrollY: number): boolean {
    const top = this.el.nativeElement.offsetTop;
    const bottom = top + this.el.nativeElement.offsetHeight;
    return scrollY >= top && scrollY < bottom;
  }

}
