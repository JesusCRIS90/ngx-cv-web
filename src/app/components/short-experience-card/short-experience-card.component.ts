import { Component, input } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION as PAIR_POLICY,
} from '@beexy/ngx-layouts'

import { TimeLineCard } from '../../interfaces'

@Component({
  selector: 'short-experience-card',
  imports: [PairLay],
  templateUrl: './short-experience-card.component.html',
  styleUrl: './short-experience-card.component.css',
})
export class ShortExperienceCardComponent {
  PAIR_POLICY = PAIR_POLICY;

  experience = input.required<TimeLineCard>();

  getRole(): string { return this.experience().role }
  getTimeSpan(): string { return this.experience().timeSpan }
  getCompany(): string { return this.experience().company }
  getDescription(): string { return this.experience().description }

}
