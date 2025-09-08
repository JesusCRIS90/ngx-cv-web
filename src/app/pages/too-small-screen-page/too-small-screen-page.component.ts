import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { BeeResponsiveSchemaService as ResponsiveService } from '@beexy/ngx-providers'
import { CenterLayoutComponent as CenterLayout } from '@beexy/ngx-layouts'


@Component({
  selector: 'app-too-small-screen-page',
  imports: [ CenterLayout ],
  templateUrl: './too-small-screen-page.component.html',
  styleUrl: './too-small-screen-page.component.css',
})
export default class TooSmallScreenPageComponent implements OnDestroy, AfterViewInit {

  private resizeSubscription!: Subscription;

  constructor(
    private router: Router,
    private responsiveService: ResponsiveService
  ) {}

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.configWindowResize();
  }


  private configWindowResize() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(120)) // delay in ms (adjust as needed)
      .subscribe(() => this.checkInvalidScreenSize());
  }

  private checkInvalidScreenSize() {
    if (this.responsiveService.getCurrentSchema() === 'tiny-screen') {
      this.router.navigate(['/invalidScreenSize']);
      return;
    }

    this.router.navigate(['/']);  return;
  }
}
