import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

export interface ElementMetrics {
  width: number;
  height: number;
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  paddings: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

@Directive({
  selector: '[beeElementMetrics]'
})
export class ElementMetricsDirective implements AfterViewInit, OnDestroy {
  @Output() metricsChange = new EventEmitter<ElementMetrics>();

  private resizeObserver?: ResizeObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // emit once on init
    this.emitMetrics();

    // observe size changes
    this.resizeObserver = new ResizeObserver(() => {
      this.emitMetrics();
    });
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private emitMetrics(): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);

    const metrics: ElementMetrics = {
      width: rect.width,
      height: rect.height,
      margins: {
        top: parseFloat(styles.marginTop) || 0,
        bottom: parseFloat(styles.marginBottom) || 0,
        left: parseFloat(styles.marginLeft) || 0,
        right: parseFloat(styles.marginRight) || 0
      },
      paddings: {
        top: parseFloat(styles.paddingTop) || 0,
        bottom: parseFloat(styles.paddingBottom) || 0,
        left: parseFloat(styles.paddingLeft) || 0,
        right: parseFloat(styles.paddingRight) || 0
      }
    };

    this.metricsChange.emit(metrics);
  }
}
