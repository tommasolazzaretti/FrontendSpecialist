import {Action, createReducer, on} from '@ngrx/store';
import {Book} from '../../model/book';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {fromBookActions} from '../actions/books.actions';
import _ from 'lodash';

export const BOOK_FEATURE_KEY = 'book';

export interface State extends EntityState<Book> {
  selectedItem: Book;
  loaded: boolean;
  error?: Error | any;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  // In this case this would be optional since primary key is id
  selectId: item => item.id
});

export const initialState: State = adapter.getInitialState({
  // Additional entity state properties
  selectedItem: null,
  loaded: false,
  error: null
});

const reducer = createReducer(
  initialState,
  on(fromBookActions.loadBooksSuccess, (state, {data}) => {
    return adapter.setAll(data, {
      ...state,
      loaded: false
    });
  }),
  on(fromBookActions.loadBooksFail, (state, {error}) => {
    return {
      ...state,
      loaded: false,
      error
    };
  }),
  on(fromBookActions.loadBookSuccess, (state, {item}) => {
    return {
      ...state,
      loaded: false,
      selectedItem: item
    };
  }),
  on(fromBookActions.loadBookFail, (state, {error}) => {
    return {
      ...state,
      loaded: false,
      selectedItem: null,
      error
    };
  }),
  on(fromBookActions.deleteBookSuccess, (state) => {
    const clonedState = _.cloneDeep(state);
    clonedState.ids = clonedState.ids.filter((id) => id !== state.selectedItem.id);
    return adapter.removeOne(clonedState, {
      ...clonedState,
      loaded: false
    });
  }),
  on(fromBookActions.deleteBookFail, (state, {error}) => {
    return {
      ...state,
      selectedItem: null,
      loaded: false,
      error
    };
  })
);

export function bookReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
