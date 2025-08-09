import { Component } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION as PAIR_POLICY,
} from '@beexy/ngx-layouts'

import {
  SVGIconComponent as SVG
} from '@beexy/ngx-components'

@Component({
  selector: 'skill-card',
  imports: [PairLay, SVG],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.css',
})
export class SkillCardComponent {
  PAIR_POLICY = PAIR_POLICY;
}
