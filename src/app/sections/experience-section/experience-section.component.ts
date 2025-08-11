import { Component, inject, signal } from '@angular/core';

import {
  ResponsiveLayoutComponent as ResponsiveLayout,
  ScreenOrientation,
} from '@beexy/ngx-layouts'

import {
  RoundIconComponent as SVGRound,
} from '@beexy/ngx-components'

import { NoModalWindowService } from '@beexy/ngx-popups'

import { ShortExperienceCardComponent, LongExperienceCardComponent } from '../../components'
import { ClickableActionDirective } from '../../directives'

import { TimeLineCard } from '../../interfaces'
import { TimelineComponent, TimelineAlign } from '../../devComp/timeline/timeline.component'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';


const experinceArray: TimeLineCard[] = [
  {
    icon: 'bicon-tech-education',
    role: 'Software Engineer',
    company: 'Seville University',
    timeSpan: 'ENE 2019 - JUL 2024',
    description: 'Brief Description',
    type: 'experience',
  },
  {
    icon: 'bicon-tech-education',
    role: 'Software Engineer',
    company: 'Seville University',
    timeSpan: 'ENE 2019 - JUL 2024',
    description: 'Brief Description',
    type: 'experience',
  },
  {
    icon: 'bicon-tech-education',
    role: 'Software Engineer',
    company: 'Seville University',
    timeSpan: 'ENE 2019 - JUL 2024',
    description: 'Brief Description',
    type: 'education',
  }
]

@Component({
  selector: 'sec-experience',
  imports: [ShortExperienceCardComponent, TimelineComponent, SVGRound, ClickableActionDirective, ResponsiveLayout],
  templateUrl: './experience-section.component.html',
})
export class ExperienceSectionComponent {

  events: TimeLineCard[] = experinceArray;
  timelineAligment = signal<TimelineAlign>('alternate');

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  constructor(private noModalService: NoModalWindowService) { }

  getEvents(): TimeLineCard[] {
    return this.events;
  }

  getIconRef(type: 'education' | 'experience') {
    if (type === 'education') return 'bicon-common-education';
    else return 'bicon-common-experience';
  }

  onClickExpCard() {
    console.log('Experience Card Clicked')
    this.noModalService.open({
      component: LongExperienceCardComponent,
      data: {}
    })
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }

  protected getTimeLineAligment(): TimelineAlign{
    return this.timelineAligment();
  }

  protected onOrientationChange(orientation: ScreenOrientation){
    if( orientation === 'landscape' ){
      this.timelineAligment.set( 'alternate' );
      return;
    }
    this.timelineAligment.set( 'right' );
  }
}
