import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION as PAIR_POLICY,
  HorizontalLayoutComponent as HoriFlex,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import { BeeTooltipPopupDirective as DBeeToolTip } from '@beexy/ngx-popups'

import { SVGIconComponent as SVG } from '@beexy/ngx-components'

import { LongExperienceCard, Technology } from '../../interfaces'

import { MarkdownViewerComponent as MDViewer } from '../../devComp/markdown-viewer/markdown-viewer.component'

@Component({
  selector: 'app-long-experience-card',
  imports: [PairLay, HoriFlex, MDViewer, SVG, DBeeToolTip],
  templateUrl: './long-experience-card.component.html',
  styleUrl: './long-experience-card.component.css',
})
export class LongExperienceCardComponent implements OnInit, OnDestroy {
  PAIR_POLICY = PAIR_POLICY;
  POLICY = POLICY;

  experienceCard!: LongExperienceCard;

  // Collect all tooltip directives inside this component
  @ViewChildren(DBeeToolTip) tooltips!: QueryList<DBeeToolTip>;

  constructor() { }

  ngOnInit(): void {
    console.log("LongExperienceCard", this.experienceCard);
  }

  ngOnDestroy(): void {
    // Ensure all tooltips are closed before component is destroyed
    if (this.tooltips) {
      this.tooltips.forEach(t => {
        try {
          t.closeTooltip();
        } catch (e) {
          console.warn('Error closing tooltip:', e);
        }
      });
    }
  }

  getCard(): LongExperienceCard {
    return this.experienceCard;
  }

}
