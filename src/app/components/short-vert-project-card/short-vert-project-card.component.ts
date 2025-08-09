import { Component, input } from '@angular/core';

import {
  BeeHoverOnceDirective as HoverOnce,
  RelativeLayoutComponent as RelativeLay,
  FloatingLayoutComponent as FloatLay,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import { ClickableActionDirective } from '../../directives'

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

  onHoverChange(isHovered: boolean) {
    // console.log('Hovered:', isHovered);
    this.onHover = isHovered;
  }

  onClickAction() {
    console.log('Clicked Project Card');
  }

}
