import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {AppState} from '../../app.module';
import {authReducer} from './auth.reducer';
import {uiReducer} from './ui.reducer';
import {InjectionToken} from '@angular/core';
import {BOOK_FEATURE_KEY, bookReducer} from './books.reducer';

const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  [BOOK_FEATURE_KEY]: bookReducer,
  ui: uiReducer
};

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>(
  'Registered Reducers',
  {
    factory: () => reducers
  }
);

export const getState = createFeatureSelector<AppState>('state');
