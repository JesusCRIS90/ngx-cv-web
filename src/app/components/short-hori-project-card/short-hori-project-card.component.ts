import { Component, input } from '@angular/core';

import {
  BeeHoverOnceDirective as HoverOnce,
  RelativeLayoutComponent as RelativeLay,
  FloatingLayoutComponent as FloatLay,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import { NoModalWindowService } from '@beexy/ngx-popups'

import { ClickableActionDirective } from '../../directives'
import { LongProjectCardComponent as LongProjectCard } from '../../components'

@Component({
  selector: 'short-hori-project-card',
  imports: [HoverOnce, RelativeLay, FloatLay, ClickableActionDirective],
  templateUrl: './short-hori-project-card.component.html',
  styleUrl: './short-hori-project-card.component.css',
})
export class ShortHoriProjectCardComponent {
  POLICY = POLICY;

  imgUrl = input.required<string>();
  onHover: boolean = false;

  constructor(private noModalService: NoModalWindowService) { }

  onHoverChange(isHovered: boolean) {
    // console.log('Hovered:', isHovered);
    this.onHover = isHovered;
  }

  onClickAction() {
    console.log('Clicked Project Card');
    this.noModalService.open({
      component: LongProjectCard,
      data: {}
    })
  }

}


// "./assets/images/dog-test-3.jpg"
