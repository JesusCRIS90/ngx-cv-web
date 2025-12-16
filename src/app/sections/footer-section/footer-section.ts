import { Component } from '@angular/core';

import { VerticalLayoutComponent as FlexVert } from '@beexy/ngx-layouts';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'sec-footer',
  imports: [FlexVert, RouterLink],
  templateUrl: './footer-section.html',
 styleUrls: ['./footer-section.css']
})
export class FooterSection {}
