
import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class CompositionGuard implements
  CanDeactivate<ComponentCanDeactivate> {

  constructor() { }

  canDeactivate(composition: ComponentCanDeactivate) {
    return confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
  }
}
