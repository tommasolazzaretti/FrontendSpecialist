import {createAction} from '@ngrx/store';

export const toggleLoader = createAction(
  '[ui] Toggle Loader',
);

export const showLoader = createAction(
  '[ui] Show Loader',
);

export const hideLoader = createAction(
  '[ui] Hide Loader',
);

export const dirtyForm = createAction(
  '[ui] Dirty Form',
);

export const undirtyForm = createAction(
  '[ui] Undirty Form',
);

