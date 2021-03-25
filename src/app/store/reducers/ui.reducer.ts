import { createReducer, on } from '@ngrx/store';
import {
  hideLoader,
  showLoader,
  toggleLoader
} from '../actions/ui.actions';

export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false
};

export const uiReducer = createReducer(
  initialState,
  on(hideLoader, (state, action) => ({ ...state, isLoading: false })),
  on(showLoader, (state, action) => ({ ...state, isLoading: true })),
  on(toggleLoader, (state, action) => ({ ...state, isLoading: !state.isLoading })),
);
