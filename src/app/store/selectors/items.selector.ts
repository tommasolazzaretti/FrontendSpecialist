import {createSelector} from '@ngrx/store';
import {getState} from '../reducers';
import {AppState} from '../../app.module';
import {Book} from '../../model/book';

export const getItems = createSelector(
  getState,
  (state: AppState) => state.items
);

export const getTotal = createSelector(
  getItems,
  (state: Book[]) => state.length
);
