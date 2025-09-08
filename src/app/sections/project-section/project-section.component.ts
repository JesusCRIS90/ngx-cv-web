import { AfterViewInit, Component, inject, input, OnDestroy, OnInit } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  ResponsiveLayoutComponent as ResponsiveLayout,
} from '@beexy/ngx-layouts'

import { BeeResponsiveSchemaService as ResponsiveService } from '@beexy/ngx-providers';

import {
  LayoutHoriShortProjectCardsComponent as ProjectsCardsHoriDistribution,
  LayoutVertShortProjectCardsComponent as ProjecsCardsVertDistributuib,
} from '../../components';


import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';
import { Project } from '../../interfaces';


@Component({
  selector: 'sec-projects',
  imports: [
    ResponsiveLayout,
    ProjectsCardsHoriDistribution,
    ProjecsCardsVertDistributuib,
  ],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css'
})
export class ProjectsSectionComponent implements OnInit, OnDestroy, AfterViewInit {
  private resizeSubscription!: Subscription;

  private responsiveSchemma: string | null = null;

  projects = input.required<Project[]>();

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  constructor(
    private responsiveService: ResponsiveService
  ) {
    this.updateCurrentSchema();
  }

  ngAfterViewInit(): void {
    this.updateCurrentSchema();
  }

  ngOnInit(): void {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(150)) // delay in ms (adjust as needed)
      .subscribe(() => this.updateCurrentSchema());
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }

  protected getResponsiveSChemma(): string | null{
    return this.responsiveSchemma;
  }

  private updateCurrentSchema() {
    this.responsiveSchemma = this.responsiveService.getCurrentSchema();
  }
}
