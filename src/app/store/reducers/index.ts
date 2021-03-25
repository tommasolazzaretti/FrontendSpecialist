import {authReducer} from './auth.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {AppState} from '../../app.module';
import {uiReducer} from './ui.reducer';
import {itemsReducer} from './items.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  items: itemsReducer,
  ui: uiReducer
};

// export const getState = createFeatureSelector<AppState>('ui');
export const getState = createFeatureSelector<AppState>('state');
