import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  input
} from '@angular/core';

@Component({
  selector: 'app-auto-hide-layout',
  imports: [],
  templateUrl: './auto-hide-layout.component.html',
  styleUrl: './auto-hide-layout.component.css',
})
export class AutoHideLayoutComponent implements OnInit, OnDestroy {

  autoHideMs = input<number>(0);

  visible = true;
  private timerId: any;

  ngOnInit(): void {
    if (this.autoHideMs() > 0) {
      this.startHideTimer();
    }
  }
  ngOnDestroy(): void {
    this.clearTimer();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.clearTimer();
    this.visible = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.autoHideMs() > 0) {
      this.startHideTimer();
    }
  }

  private startHideTimer(): void {
    this.clearTimer();
    this.timerId = setTimeout(() => {
      this.visible = false;
    }, this.autoHideMs());
  }

  private clearTimer(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
