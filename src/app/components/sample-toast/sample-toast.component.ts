import { Component, OnDestroy, OnInit } from '@angular/core';

import { BaseToastComponent, ToastUUID } from '@beexy/ngx-popups'
import {
  FloatingLayoutComponent as FloatLayout,
  RelativeLayoutComponent as RelativeLayout,
  POLICY_POSITION
} from '@beexy/ngx-layouts'

@Component({
  selector: 'app-sample-toast',
  imports: [FloatLayout, RelativeLayout],
  templateUrl: './sample-toast.component.html',
  // styles: [`.toast { background:#2767ddff; color: white; margin: 0; padding: 10px; border-radius: 5px; }`]
  styleUrl: './sample-toast.component.css'
})
export class SampleToastComponent implements OnInit, OnDestroy, BaseToastComponent{
  POLICY_POSITION = POLICY_POSITION

  message = "Default";
  close!: (toastUUID: ToastUUID) => void;
  toastUUID!: ToastUUID;

  ngOnInit() {
    setTimeout(() => this.close(this.getToastUUID()), 3000); // Auto-close after 3s
  }

  ngOnDestroy(): void {
    console.log('Destroying SampleToastComponent');
  }

  getToastUUID(): ToastUUID{
    return this.toastUUID;
  }

  manualClose(): void {
    this.close( this.getToastUUID() )
  }
}
