import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScrollTrackerRegistryService {
  public alreadyInstantiated = false;
}
