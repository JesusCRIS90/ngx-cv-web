import { Component, computed, ContentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet, CommonModule } from '@angular/common';


@Component({
  selector: 'bee-indicators',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.css',
})
export class IndicatorsComponent {

  idx!: number;
  totalElements = input.required<number>();
  activeElement = input<number>(0);
  activeElementClass = input<string>('');

  @ContentChild('element') element!: TemplateRef<{ isActive: boolean }>;

  range = computed(() => Array.from({ length: this.totalElements() }, (_, i) => i));

}
