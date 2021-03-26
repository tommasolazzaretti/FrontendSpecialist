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
    console.log('loadBooksSuccess state ', state);
    return adapter.addMany(data, {
      ...state,
      loaded: true
    });
  }),
  on(fromBookActions.loadBooksFail, (state, {error}) => {
    return {
      ...state,
      error
    };
  }),
  on(fromBookActions.loadBookSuccess, (state, {item}) => {
    return {
      ...state,
      selectedItem: item
    };
  }),
  on(fromBookActions.loadBookFail, (state, {error}) => {
    return {
      ...state,
      selectedItem: null,
      error
    };
  }),
  on(fromBookActions.deleteBookSuccess, (state) => {
    const clonedState = _.cloneDeep(state);
    delete clonedState.entities[state.selectedItem.id];
    console.log('state ', state);
    console.log('clonedState ', clonedState);
    return {
      ...clonedState,
      selectedItem: null,
    };
  }),
  on(fromBookActions.deleteBookFail, (state, {error}) => {
    return {
      ...state,
      selectedItem: null,
      error
    };
  })
);

export function bookReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
