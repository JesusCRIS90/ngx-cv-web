import { Directive, ElementRef, Input, Renderer2, OnInit, input } from '@angular/core';

@Directive({
  selector: '[beeBackgroundDir]',
})
export class BackgroundDirectiveDirective implements OnInit {

  urlImage = input.required<string>();
  blurDeepth = input<number>( 3 );
  colorOverlay = input<string>( '#1d1d1d80' );

  constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
    const element = this.el.nativeElement;

    // Ensure relative positioning for pseudo-elements
    this.renderer.setStyle(element, 'position', 'relative');
    this.renderer.setStyle(element, 'z-index', '0');

    // Create dynamic <style> block
    const style = document.createElement('style');
    style.innerHTML = `
      [beeBackgroundDir]::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 99%;
        height: 99%;
        background-image: url('${this.urlImage()}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: blur(${this.blurDeepth()}px);
        z-index: -2;
      }
      [beeBackgroundDir]::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${this.colorOverlay()};
        z-index: -1;
      }
    `;

    console.log( style )
    document.head.appendChild(style);
  }
}
