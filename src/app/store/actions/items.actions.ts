import { createAction, props } from '@ngrx/store';
import {Book} from '../../model/book';

export const loadItems = createAction(
  '[Items] load'
);

export const loadItemsSuccess = createAction(
  '[Items] load success',
  props<{ items: Book[]}>()
);

export const loadItemsFailed = createAction(
  '[Items] load failed',
);

export const getItem = createAction(
  '[Items] get',
  props<{ id: number}>()
);

export const getItemSuccess = createAction(
  '[Items] get success',
  props<{ item: Book}>()
);

export const getItemFailed = createAction(
  '[Items] get failed',
);

export const addItem = createAction(
  '[Items] add',
  props<{ item: Partial<Book>}>()
);

export const addItemSuccess = createAction(
  '[Items] add success',
  props<{ item: Book}>()
);

export const addItemFailed = createAction(
  '[Items] add failed',
);

export const deleteItem = createAction(
  '[Items] delete',
  props<{ id: number }>()
);

export const deleteItemSuccess = createAction(
  '[Items] delete success',
  props<{ id: number }>()
);

export const deleteItemFailed = createAction(
  '[Items] delete failed',
);
