import { Component } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION as PAIR_POLICY,
  HorizontalLayoutComponent as HoriFlex,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import { SVGIconComponent as SVG } from '@beexy/ngx-components'

import { Experience } from '../../interfaces'

import { MarkdownViewerComponent as MDViewer } from '../../devComp/markdown-viewer/markdown-viewer.component'

@Component({
  selector: 'app-long-experience-card',
  imports: [PairLay, HoriFlex, MDViewer, SVG],
  templateUrl: './long-experience-card.component.html',
  styleUrl: './long-experience-card.component.css',
})
export class LongExperienceCardComponent {
  PAIR_POLICY = PAIR_POLICY;
  POLICY = POLICY;
}
