import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.module';
import {FormGroup, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {getBookById, selectAllBooks, selectEntityCount} from '../../store/selectors/books.selector';
import {fromBookActions} from '../../store/actions/books.actions';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit, OnDestroy {
  id: number = null;
  form: FormGroup;
  book: Book;
  books$: Observable<Book[]> = this.store.pipe(select(selectAllBooks));

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.store.dispatch(fromBookActions.loadBook({id: params.id}));
      }
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(getBookById())).subscribe(book => {
      this.book = book ? book : new Book();
      console.log('getBookById ', book);
    });
  }

  saveHandler(form: NgForm) {
    this.saveBook({...form.value});
  }

  saveBook(book: Partial<Book>) {
    this.store.dispatch(fromBookActions.saveBook({data: book}));
  }

  deleteBook(id: number) {
    this.store.dispatch(fromBookActions.deleteBook({id}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(fromBookActions.loadBook({id: null}));
  }

}
