import {createSelector} from '@ngrx/store';
import {getState} from '../reducers';

export const getUi = createSelector(
  getState,
  (state: any) => state.ui
);
