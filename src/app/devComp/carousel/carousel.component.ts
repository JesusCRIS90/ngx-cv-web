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
  computed,
  linkedSignal,
  effect,
} from '@angular/core';
import { NgTemplateOutlet, CommonModule } from '@angular/common';

import {
  RelativeLayoutComponent as RelativeLayout,
  FloatingLayoutComponent as FloatLayout,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import { CircularQueue } from '../CircularQueue'
import { EndlessTimerDirective } from '../endless-timer.directive'
import { AutoHideLayoutComponent } from '../auto-hide-layout/auto-hide-layout.component'

type Position = 'Inside' | 'Outside';
type CarouselTransition = 'fade' | 'slide-left' | 'slide-right';

export interface CarouselTriggerData {
  totalItems: number,
  currentItemNumerical: number,
  currentItem: unknown
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CommonModule,
    RelativeLayout,
    FloatLayout,
    EndlessTimerDirective,
    AutoHideLayoutComponent,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent<T> implements AfterContentInit, AfterViewInit, OnDestroy {

  POLICY = POLICY;

  setIndex = input<number|null>();
  items = input.required<T[]>();
  arrowsPos = input<Position>('Outside');
  indicatorPos = input<Position>('Outside');
  circular = input<boolean>(true);

  autoplay = input<boolean>(true);
  autoPlayInterval = input<number>(3000);
  pauseOnHover = input<boolean>(false);
  autoHideMs = input<number>(0);

  transitionType = input<CarouselTransition>('slide-right');


  @Output() indexChanged = new EventEmitter<CarouselTriggerData>();

  @ContentChild('body') bodyTemplate!: TemplateRef<any>;
  @ContentChild('arrowLeft') arrowLeftTemplate?: TemplateRef<any>;
  @ContentChild('arrowRight') arrowRightTemplate?: TemplateRef<any>;
  @ContentChild('indicators') indicatorsTemplate?: TemplateRef<any>;

  @ViewChild('autoplay') autoplayDirective?: EndlessTimerDirective;

  setIndexSignal = linkedSignal(this.setIndex);

  currentItem!: T;
  previousItem!: T | null;
  queue!: CircularQueue<T>;
  direction: 'left' | 'right' = 'right';

  animationClass = '';
  private animationResetTimeout: any;

  constructor() {
    effect(() => {
      const index = this.setIndexSignal();
      // console.log('LinkedSignal triggered with index:', index);
      if (index != null && this.queue.isValidIndex(index) && index !== this.queue.getCurrentIndex()) {
        this.goTo(index);
      }
    });
  }

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

  get totalElements() {
    return this.queue.totalItems;
  }

  onNext() {
    if (!this.circular()) {
      if (this.queue.isLastIndex()) return;
    }
    this.direction = 'right';
    this.resetAnimationClass(this.getAnimationClass());

    this.previousItem = this.currentItem;
    this.queue.moveNext();
    this.currentItem = this.queue.current;
    this.autoplayDirective?.reset();

    this.emitCarouselTriggered();
  }

  onPrev() {
    if (!this.circular()) {
      if (this.queue.isFirstIndex()) return;
    }
    this.direction = 'left';
    this.resetAnimationClass(this.getAnimationClass());

    this.previousItem = this.currentItem;
    this.queue.movePrev();
    this.currentItem = this.queue.current;
    this.autoplayDirective?.reset();

    this.emitCarouselTriggered();
  }

  goTo(index: number) {
    if (index === this.queue.getCurrentIndex()) return;

    this.direction = index > this.queue.getCurrentIndex() ? 'right' : 'left';
    this.resetAnimationClass(this.getAnimationClass());

    this.queue.moveTo(index);
    this.currentItem = this.queue.current;

    this.emitCarouselTriggered();
  }

  protected areArrowProvided(): boolean {
    const leftArrowProvided = !!this.arrowLeftTemplate;
    const rightArrowProvided = !!this.arrowRightTemplate;

    return leftArrowProvided !== rightArrowProvided ? true : false;
  }

  protected getLeftArrowPolicy() {
    if (this.arrowsPos() === 'Outside') {
      return POLICY.CENTER_RIGHT;
    } else {
      return POLICY.CENTER_LEFT;
    }
  }

  protected getRightArrowPolicy() {
    if (this.arrowsPos() === 'Outside') {
      return POLICY.CENTER_LEFT;
    } else {
      return POLICY.CENTER_RIGHT;
    }
  }

  protected getIndicatorPolicy() {
    if( this.indicatorPos() === 'Outside' ){
      return POLICY.TOP_CENTER;
    } else{
      return POLICY.BOTTOM_CENTER;
    }
  }

  protected onMouseEnter() {
    if (this.pauseOnHover()) this.autoplayDirective?.stop();
  }

  protected onMouseLeave() {
    if (this.pauseOnHover()) this.autoplayDirective?.start();
  }

  protected emitCarouselTriggered() {
    this.indexChanged.emit({
      totalItems: this.queue.totalItems,
      currentItemNumerical: this.queue.getCurrentIndex(),
      currentItem: this.currentItem
    })
  }

  protected getCurrentIndex(): number {
    return this.queue.getCurrentIndex();
  }

  protected getAnimationClass(): string {
    if (this.transitionType() === 'fade') {
      return this.queue.getCurrentIndex() % 2 ? 'fade-animation-1' : 'fade-animation-2';
    }
    return this.direction === 'left' ? 'slide-left-animation' : 'slide-right-animation';
  }

  resetAnimationClass(className: string) {
    if (className === 'fade-animation') {
      this.animationClass = className;
      return;
    }

    clearTimeout(this.animationResetTimeout);
    this.animationClass = '';
    this.animationResetTimeout = setTimeout(() => {
      this.animationClass = className;
    }, 0);
  }

  protected onAutoPlay() {
    if (this.transitionType() === 'slide-left') {
      this.onPrev();
      return;
    }
    this.onNext();
  }
}
