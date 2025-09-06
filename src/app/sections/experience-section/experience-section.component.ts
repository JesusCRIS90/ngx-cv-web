import { AfterViewInit, Component, HostListener, inject, input, linkedSignal, OnDestroy, OnInit, signal } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  ResponsiveLayoutComponent as ResponsiveLayout,
  ScreenOrientation,
} from '@beexy/ngx-layouts'

import {
  RoundIconComponent as SVGRound,
} from '@beexy/ngx-components'

import { NoModalWindowService } from '@beexy/ngx-popups'

import { BeeResponsiveSchemaService as ResponsiveService } from '@beexy/ngx-providers'

import { ShortExperienceCardComponent, LongExperienceCardComponent } from '../../components'
import { ClickableActionDirective } from '../../directives'

import { Experience, TimeLineCard } from '../../interfaces'
import { TimelineComponent, TimelineAlign } from '../../devComp/timeline/timeline.component'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';
import { AppDataMapper } from '../../mappers/AppDataMapper';


@Component({
  selector: 'sec-experience',
  imports: [ShortExperienceCardComponent, TimelineComponent, SVGRound, ClickableActionDirective, ResponsiveLayout],
  templateUrl: './experience-section.component.html',
})
export class ExperienceSectionComponent implements OnInit, OnDestroy, AfterViewInit {
  private resizeSubscription!: Subscription;

  experience = input.required<Experience[]>();

  events = linkedSignal<TimeLineCard[]>(() => this.getTimeLineCards());
  timelineAligment = signal<TimelineAlign>('alternate');

  private orientation: ScreenOrientation = 'landscape';
  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  constructor(
    private noModalService: NoModalWindowService,
    private responsiveService: ResponsiveService
  ) { }

  ngAfterViewInit(): void {
    this.updateTimeLineAlignment()
  }

  ngOnInit(): void {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200)) // delay in ms (adjust as needed)
      .subscribe(() => this.updateTimeLineAlignment());
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  getEvents(): TimeLineCard[] {
    return this.events();
  }

  getIconRef(type: 'education' | 'experience') {
    if (type === 'education') return 'bicon-common-education';
    else return 'bicon-common-experience';
  }

  onClickExpCard(id: string) {
    console.log(`Experience Card with id: ${id} Clicked`);
    const cardData = this.getExperienceById(id);

    if (cardData === undefined) return;

    this.noModalService.open({
      component: LongExperienceCardComponent,
      data: {
        experienceCard: AppDataMapper.Experience2LongExperienceCard(cardData)
      }
    })
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }

  protected getTimeLineAligment(): TimelineAlign {
    return this.timelineAligment();
  }

  protected onOrientationChange(orientation: ScreenOrientation) {
    this.orientation = orientation;
  }

  protected getTimeLineCards(): TimeLineCard[] {
    return AppDataMapper.ExperienceArray2TimeLineCardArray(this.experience());
  }

  protected getExperienceById(id: string): Experience | undefined {
    return this.experience().find((card) => card.id === id);
  }

  protected updateTimeLineAlignment() {

    if (this.orientation === 'portrait') {
      this.timelineAligment.set('right');
      return;
    }

    if (this.responsiveService.getCurrentSchema() === 'small-screen') {
      this.timelineAligment.set('right');
    } else {
      this.timelineAligment.set('alternate');
    }
  }
}
