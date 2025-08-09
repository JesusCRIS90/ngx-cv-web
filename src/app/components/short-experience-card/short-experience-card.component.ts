import { Component } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION as PAIR_POLICY,
} from '@beexy/ngx-layouts'

@Component({
  selector: 'short-experience-card',
  imports: [PairLay],
  templateUrl: './short-experience-card.component.html',
  styleUrl: './short-experience-card.component.css',
})
export class ShortExperienceCardComponent {
  PAIR_POLICY = PAIR_POLICY;
}
