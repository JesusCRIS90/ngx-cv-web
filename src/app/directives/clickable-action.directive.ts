import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickableAction]',
})
export class ClickableActionDirective {
  @Output() actionClick = new EventEmitter<void>();

  @HostListener('click')
  onClickEvent() {
    this.actionClick.emit();
  }
}
