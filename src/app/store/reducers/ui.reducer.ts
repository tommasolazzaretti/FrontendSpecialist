import { createReducer, on } from '@ngrx/store';
import {
  hideLoader,
  showLoader,
  toggleLoader,
  dirtyForm,
  undirtyForm
} from '../actions/ui.actions';

export interface UiState {
  isLoading: boolean;
  dirtyForm: boolean;
}

const initialState: UiState = {
  isLoading: false,
  dirtyForm: false
};

export const uiReducer = createReducer(
  initialState,
  on(hideLoader, (state, action) => ({ ...state, isLoading: false })),
  on(showLoader, (state, action) => ({ ...state, isLoading: true })),
  on(toggleLoader, (state, action) => ({ ...state, isLoading: !state.isLoading })),
  on(dirtyForm, (state, action) => ({ ...state, dirtyForm: true })),
  on(undirtyForm, (state, action) => ({ ...state, dirtyForm: false })),
);
