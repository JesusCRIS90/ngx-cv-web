import { Component, input } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION as PAIR_POLICY,
} from '@beexy/ngx-layouts'

import {
  SVGIconComponent as SVG
} from '@beexy/ngx-components'

import {
  SkillCard, Skill
} from '../../interfaces'

@Component({
  selector: 'skill-card',
  imports: [PairLay, SVG],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.css',
})
export class SkillCardComponent {
  PAIR_POLICY = PAIR_POLICY;

  skill = input.required<Skill>();

  getIconName(): string {
    return this.skill().refIconName;
  }

  getName(): string {
    return this.skill().name;
  }

  getTopic(): string {
    return this.skill().topic;
  }
}
