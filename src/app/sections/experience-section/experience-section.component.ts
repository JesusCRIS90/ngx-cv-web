import { Component } from '@angular/core';

import { TimelineModule } from 'primeng/timeline';

import { ShortExperienceCardComponent } from '../../components'

import { TimeLineCard } from '../../interfaces'
import { TimelineComponent } from '../../devComp/timeline/timeline.component'

const experinceArray: TimeLineCard[] = [
  {
    icon: 'bicon-tech-education',
    role: 'Software Engineer',
    company: 'Seville University',
    timeSpan: 'ENE 2019 - JUL 2024',
    description: 'Brief Description'
  },
  {
    icon: 'bicon-tech-education',
    role: 'Software Engineer',
    company: 'Seville University',
    timeSpan: 'ENE 2019 - JUL 2024',
    description: 'Brief Description'
  },
  {
    icon: 'bicon-tech-education',
    role: 'Software Engineer',
    company: 'Seville University',
    timeSpan: 'ENE 2019 - JUL 2024',
    description: 'Brief Description'
  }
]

@Component({
  selector: 'sec-experience',
  imports: [ShortExperienceCardComponent, TimelineComponent],
  templateUrl: './experience-section.component.html',
})
export class ExperienceSectionComponent {

  events: TimeLineCard[] = experinceArray;

  getEvents(): TimeLineCard[] {
    return this.events;
  }
}
