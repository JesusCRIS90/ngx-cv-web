import {
  Component,
  ContentChild,
  TemplateRef,
  AfterContentInit,
  input,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import {
  RelativeLayoutComponent as RelativeLayout,
  FloatingLayoutComponent as FloatLayout,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import { CircularQueue } from '../CircularQueue'
import { EndlessTimerDirective } from '../endless-timer.directive'
import { AutoHideLayoutComponent } from '../auto-hide-layout/auto-hide-layout.component'

type ArrowPos = 'Inside' | 'Outside';

export interface CarouselTriggerData {
  totalItems: number,
  currentItemNumerical: number,
  currentItem: unknown
}

@Component({
  selector: 'app-carousel',
  imports: [NgTemplateOutlet, RelativeLayout, FloatLayout, EndlessTimerDirective, AutoHideLayoutComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent<T> implements AfterContentInit, AfterViewInit, OnDestroy {

  POLICY = POLICY;

  items = input.required<T[]>();
  arrowsPos = input<ArrowPos>('Outside');
  circular = input<boolean>(true);
  autoplay = input<boolean>(true);
  autoPlayInterval = input<number>(3000);
  pauseOnHover = input<boolean>(false);

  @Output() itemTriggered = new EventEmitter<CarouselTriggerData>();

  @ContentChild('body') bodyTemplate!: TemplateRef<any>;
  @ContentChild('arrowLeft') arrowLeftTemplate?: TemplateRef<any>;
  @ContentChild('arrowRight') arrowRightTemplate?: TemplateRef<any>;
  @ContentChild('indicators') indicatorsTemplate?: TemplateRef<any>;

  @ViewChild('autoplay') autoplayDirective?: EndlessTimerDirective;

  currentItem!: T;
  queue!: CircularQueue<T>;

  ngAfterContentInit(): void {

    if (!this.bodyTemplate) {
      throw new Error('Carousel requires a body template');
    }

    if (this.areArrowProvided()) {
      throw new Error('Both arrow-left and arrow-right templates must be provided together');
    }

    // Initialize CircularQueue
    this.queue = new CircularQueue(this.items());
    this.currentItem = this.queue.current;
  }

  ngAfterViewInit() {
    if (this.autoplay() && this.autoplayDirective) {
      this.autoplayDirective.start();
    }
  }

  ngOnDestroy() {
    this.autoplayDirective?.stop();
  }

  onNext() {
    if (!this.circular()) {
      if (this.queue.isLastIndex()) return;
    }
    this.queue.moveNext();
    this.currentItem = this.queue.current;
    this.autoplayDirective?.reset();

    this.emitCarouselTriggered();
  }

  onPrev() {
    if (!this.circular()) {
      if (this.queue.isFirstIndex()) return;
    }
    this.queue.movePrev();
    this.currentItem = this.queue.current;
    this.autoplayDirective?.reset();

    this.emitCarouselTriggered();
  }

  goTo(index: number) {
    this.queue.moveTo(index);
    this.currentItem = this.queue.current;

    this.emitCarouselTriggered();
  }

  protected areArrowProvided(): boolean {
    const leftArrowProvided = !!this.arrowLeftTemplate;
    const rightArrowProvided = !!this.arrowRightTemplate;

    return leftArrowProvided !== rightArrowProvided ? true : false;
  }

  protected getLeftArrowPos() {
    if (this.arrowsPos() === 'Outside') {
      return {
        posX: 0,
        posY: 0,
        policy: POLICY.CENTER_RIGHT
      }
    } else {
      return {
        posX: 0,
        posY: 0,
        policy: POLICY.CENTER_LEFT
      }
    }
  }

  protected getRightArrowPos() {
    if (this.arrowsPos() === 'Outside') {
      return {
        posX: 100,
        posY: 0,
        policy: POLICY.CENTER_LEFT
      }
    } else {
      return {
        posX: 100,
        posY: 0,
        policy: POLICY.CENTER_RIGHT
      }
    }
  }

  protected onMouseEnter() {
    if (this.pauseOnHover()) this.autoplayDirective?.stop();
  }

  protected onMouseLeave() {
    if (this.pauseOnHover()) this.autoplayDirective?.start();
  }

  protected emitCarouselTriggered() {
    this.itemTriggered.emit({
      totalItems: this.queue.totalItems,
      currentItemNumerical: this.queue.getCurrentIndex(),
      currentItem: this.currentItem
    })
  }
}
