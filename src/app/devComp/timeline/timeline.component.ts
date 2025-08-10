import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  input,
  TemplateRef,
} from '@angular/core';

type TimelineAlign = 'left' | 'right' | 'alternate';

@Component({
  selector: 'bee-timeline',
  imports: [CommonModule],
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
}
