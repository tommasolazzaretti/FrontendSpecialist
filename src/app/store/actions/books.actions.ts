import {createAction, props} from '@ngrx/store';
import {Book} from '../../model/book';

export enum ItemsActionTypes {
  LoadBooks = '[Book] Load Books',
  LoadBooksSuccess = '[Book] Load Books Success',
  LoadBooksFail = '[Book] Load Books Fail',
  LoadBook = '[Book] Load Book',
  LoadBookSuccess = '[Book] Load Book Success',
  LoadBookFail = '[Book] Load Book Fail',
  SaveBook = '[Book] Save Book',
  SaveBookSuccess = '[Book] Save Book Success',
  SaveBookFail = '[Book] Save Book Fail',
  DeleteBook = '[Book] Delete Book',
  DeleteBookSuccess = '[Book] Delete Book Success',
  DeleteBookFail = '[Book] Delete Book Fail',
}

export const loadBooks = createAction(
  ItemsActionTypes.LoadBooks,
  props<{ data?: { title?: string, author?: string } }>()
);

export const loadBooksSuccess = createAction(
  ItemsActionTypes.LoadBooksSuccess,
  props<{ data: Book[] }>()
);

export const loadBooksFail = createAction(
  ItemsActionTypes.LoadBooksFail,
  props<{ error: Error | any }>()
);

export const loadBook = createAction(
  ItemsActionTypes.LoadBook,
  props<{ id: string | number }>()
);

export const loadBookSuccess = createAction(
  ItemsActionTypes.LoadBookSuccess,
  props<{ item: Book }>()
);

export const loadBookFail = createAction(
  ItemsActionTypes.LoadBookFail,
  props<{ error: Error | any }>()
);

export const saveBook = createAction(
  ItemsActionTypes.SaveBook,
  props<{ data: Partial<Book> }>()
);

export const saveBookSuccess = createAction(
  ItemsActionTypes.SaveBookSuccess,
  props<{ data: Book }>()
);

export const saveBookFail = createAction(
  ItemsActionTypes.SaveBookFail,
  props<{ error: Error | any }>()
);

export const deleteBook = createAction(
  ItemsActionTypes.DeleteBook,
  props<{ id: number }>()
);

export const deleteBookSuccess = createAction(
  ItemsActionTypes.DeleteBookSuccess
);

export const deleteBookFail = createAction(
  ItemsActionTypes.DeleteBookFail,
  props<{ error: Error | any }>()
);

export const fromBookActions = {
  loadBooks,
  loadBooksFail,
  loadBooksSuccess,
  loadBook,
  loadBookFail,
  loadBookSuccess,
  saveBook,
  saveBookSuccess,
  saveBookFail,
  deleteBook,
  deleteBookSuccess,
  deleteBookFail,
};
