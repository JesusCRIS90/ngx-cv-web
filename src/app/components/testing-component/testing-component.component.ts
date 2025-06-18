import { Component } from '@angular/core';

@Component({
  selector: 'app-testing-component',
  imports: [],
  templateUrl: './testing-component.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class TestingComponentComponent { }
