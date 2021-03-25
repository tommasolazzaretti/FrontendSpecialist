import {createReducer, on} from '@ngrx/store';
import {
  addItemSuccess,
  deleteItemSuccess,
  loadItemsSuccess,
  getItemSuccess
} from '../actions/items.actions';
import {Book} from '../../model/book';

// qiu è da cambiare
const initialState: Book[] = [];
// const initialState2: {
//   books?: Book[];
//   book?: Book;
// } = {books: [], book: null};

export const itemsReducer = createReducer(
  initialState,
  on(loadItemsSuccess, (state, action) => [...action.items]),
  on(getItemSuccess, (state, action) => [...state, {...action.item}]),
  on(deleteItemSuccess, (state, action) => state.filter(p => p.id !== action.id)),
  on(addItemSuccess, (state, action) => [...state, {...action.item}]),
);
