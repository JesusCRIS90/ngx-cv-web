import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ScrollYEventInfo } from '../components';


@Injectable({ providedIn: 'root' })
export class ScrollTrackerService {
  private _scroll$ = new Subject<ScrollYEventInfo>();

  get scroll$(): Observable<ScrollYEventInfo> {
    return this._scroll$.asObservable();
  }

  emit(info: ScrollYEventInfo) {
    this._scroll$.next(info);
  }
}
