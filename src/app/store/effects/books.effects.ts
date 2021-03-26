import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {fromBookActions} from '../actions/books.actions';
import {BooksService} from '../../global/services/Books.service';

@Injectable()
export class BooksEffects {

  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(fromBookActions.loadBooks),
    mergeMap(() => this.booksService.loadBooks()
      .pipe(
        map(result => fromBookActions.loadBooksSuccess({data: result})),
        catchError((err) => of(fromBookActions.loadBooksFail(err)))
      )
    )
  ));

  loadBook$ = createEffect(() => this.actions$.pipe(
    ofType(fromBookActions.loadBook),
    mergeMap((action) => this.booksService.getBook(+action.id)
      .pipe(
        map(result => fromBookActions.loadBookSuccess({item: result})),
        catchError((err) => of(fromBookActions.loadBookFail(err)))
      )
    )
  ));

  saveBook$ = createEffect(() => this.actions$.pipe(
    ofType(fromBookActions.saveBook),
    mergeMap(action => this.booksService.addBook(action.data)
      .pipe(
        map(result => fromBookActions.saveBookSuccess({ data: result })),
        catchError( (err) => of(fromBookActions.saveBookFail(err)))
      )
    )
  ));

  deleteBook$ = createEffect(() => this.actions$.pipe(
    ofType(fromBookActions.deleteBook),
    mergeMap((action) => this.booksService.deleteBook(action.id)
      .pipe(
        map(() => fromBookActions.deleteBookSuccess()),
        catchError( (err) => of(fromBookActions.deleteBookFail(err)))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) {
  }
}
