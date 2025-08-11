import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  input,
  TemplateRef,
} from '@angular/core';

import {
  GridLayout1DComponent as Grid1D,
} from '@beexy/ngx-layouts'

import { ElementMetricsDirective, ElementMetrics } from '../element-metrics.directive'

export type TimelineAlign = 'left' | 'right' | 'alternate';

@Component({
  selector: 'bee-timeline',
  imports: [CommonModule, Grid1D, ElementMetricsDirective],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {

  /** Array of items for the timeline */
  events = input.required<any[]>();

  /** Alignment: left, right, or alternate */
  align = input<TimelineAlign>('right');

  /** Template for body content (required) */
  @ContentChild('content', { static: false })
  contentTemplate!: TemplateRef<any>;

  /** Template for marker (optional) */
  @ContentChild('marker', { static: false })
  markerTemplate?: TemplateRef<any>;

  /** Check alignment for a given index */
  getItemAlignment(index: number): TimelineAlign {
    if (this.align() === 'alternate') {
      return index % 2 === 0 ? 'left' : 'right';
    }
    return this.align();
  }

  onElementMetricsChanges(metrics: ElementMetrics, index: number) {

    // calculate: height + marginTop + marginBottom
    const dynamicHeight =
      metrics.height + metrics.margins.top

    // find the marker column in this timeline item
    const timelineItem = document.querySelectorAll('.bee-timeline-item')[index];
    if (!timelineItem) return;

    const markerColumn = timelineItem.querySelector('.bee-timeline-marker-column') as HTMLElement;
    if (!markerColumn) return;

    // set a CSS variable for the ::before pseudo-element
    markerColumn.style.setProperty('--spine-height', `${dynamicHeight}px`);

    // TODO: Testing purpose. Remove Later
    console.log({ metrics, newValue: dynamicHeight });
  }
}
