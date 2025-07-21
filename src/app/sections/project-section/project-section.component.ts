import { Component } from '@angular/core';

import { CarouselComponent, CarouselTriggerData } from '../../devComp/carousel/carousel.component'

@Component({
  selector: 'sec-projects',
  imports: [CarouselComponent],
  templateUrl: './project-section.component.html',
})
export class ProjectsSectionComponent {

  items = ['Slide1', 'Slide2', 'Slide3', 'Slide4', 'Slide5'];

  getItems(){
    return this.items;
  }

  getCarouselTriggerInfo(data: CarouselTriggerData){
    console.log( data );
  }
}
