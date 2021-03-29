import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.module';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class CompositionGuard implements CanDeactivate<ComponentCanDeactivate> {
  isDirtyForm: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isDirtyForm = this.store.pipe(
      select((state: AppState) => state.ui.dirtyForm)
    );
  }

  async canDeactivate(composition: ComponentCanDeactivate) {
    let returnValue;
    await this.isDirtyForm.subscribe(data => {
      returnValue = data;
    });
    if (returnValue) {
      return confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
    } else {
      return true;
    }
  }
}
