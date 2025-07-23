import { Component, signal } from '@angular/core';

import { CarouselComponent, CarouselTriggerData } from '../../devComp/carousel/carousel.component'
import { IndicatorsComponent } from '../../devComp/indicators/indicators.component'

@Component({
  selector: 'sec-projects',
  imports: [CarouselComponent, IndicatorsComponent],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css'
})
export class ProjectsSectionComponent {

  items = ['Slide1', 'Slide2', 'Slide3', 'Slide4', 'Slide5'];

  totalElements: number = this.items.length;
  currentIndex: number = 0;

  indicatorIndex = signal<number | null>(null);

  getItems() {
    return this.items;
  }

  getCarouselTriggerInfo(data: CarouselTriggerData) {
    this.totalElements = data.totalItems;
    this.currentIndex = data.currentItemNumerical;
    // console.log( data );
  }

  IndicatorElementTriggered(index: number) {
    console.log(`Indicator:${index} clicked`);
    this.indicatorIndex.set(index);
  }

}
