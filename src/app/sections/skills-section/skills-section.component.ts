import { Component } from '@angular/core';

import {
  ResponsiveCardGridLayoutComponent as ResponsiveCardGrid,
  CardLayoutComponent as CardLayout,
  GroupDirective,
  ItemDirective,
  HorizontalLayoutComponent as HoriFlex
} from '@beexy/ngx-layouts'

import {
  BeeChipComponent as Chip
} from '@beexy/ngx-components'

import { SkillCardComponent } from '../../components'

@Component({
  selector: 'sec-skills',
  imports: [Chip, SkillCardComponent, CardLayout, ResponsiveCardGrid, HoriFlex, GroupDirective, ItemDirective],
  templateUrl: './skills-section.component.html',
})
export class SkillsSectionComponent {

  protected showingSelected(selected: string[]) {
    console.log(selected);
  }
}
