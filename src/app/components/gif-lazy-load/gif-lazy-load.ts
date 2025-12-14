import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';

@Component({
  selector: 'gif-lazy-load',
  imports: [],
  templateUrl: './gif-lazy-load.html',
})
export class GifLazyLoad implements AfterViewInit {
  @ViewChild('gifElement') gifElement!: ElementRef<HTMLImageElement>;
  gifLoaded = false;

  inputMediaUrl = input.required<string>();

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.gifLoaded = true;
        observer.disconnect();
      }
    });

    observer.observe(this.gifElement.nativeElement);
  }
}
