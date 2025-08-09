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
  selector: 'short-vert-project-card',
  imports: [HoverOnce, RelativeLay, FloatLay, ClickableActionDirective],
  templateUrl: './short-vert-project-card.component.html',
  styleUrl: './short-vert-project-card.component.css',
})
export class ShortVertProjectCardComponent {
  POLICY = POLICY;

  onHover: boolean = false;
  imgUrl = input.required<string>();

  constructor(private noModalService: NoModalWindowService){}

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
