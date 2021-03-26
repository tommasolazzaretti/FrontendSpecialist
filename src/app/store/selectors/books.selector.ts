import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, BOOK_FEATURE_KEY, State} from '../reducers/books.reducer';
import {Book} from '../../model/book';
import {Dictionary} from '@ngrx/entity';

// Lookup the 'Entity' feature state managed by NgRx
const getEntityState = createFeatureSelector<State>(BOOK_FEATURE_KEY);

// get the selectors
const {selectIds, selectAll, selectTotal} = adapter.getSelectors();

export const selectAllBooks = createSelector(
  getEntityState,
  selectAll
);

export const selectAllBooks2 = createSelector(
  getEntityState,
  (state) => state.entities
);

export const getSelectedBook = createSelector(
  getEntityState,
  (state) => state.selectedItem
);

export const getItemById = (id) => createSelector(
  selectAllBooks,
  (state) => {
    if (state) {
      return state.find(item => {
        // console.log('find item ', item);
        return item.id === id;
      });
    } else {
      return {};
    }
  });

export const getBookById = () => createSelector(
  getSelectedBook,
  (state) => state
);

// select the array of Entity ids
export const selectEntityIds = createSelector(
  getEntityState,
  selectIds
);

// select the total Entity count
export const selectEntityCount = createSelector(
  getEntityState,
  selectTotal
);

// select entity loaded flag
export const selectEntityLoaded = createSelector(
  getEntityState,
  state => state.loaded
);

// select entity error
export const selectError = createSelector(
  getEntityState,
  state => state.error
);
