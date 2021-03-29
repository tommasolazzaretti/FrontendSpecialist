import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.module';
import {FormGroup, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {getBookById} from '../../store/selectors/books.selector';
import {fromBookActions} from '../../store/actions/books.actions';
import {dirtyForm, toggleLoader, undirtyForm} from '../../store/actions/ui.actions';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit, OnDestroy {
  id: number = null;
  form: FormGroup;
  book: Book;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
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
    });

    // this.form.valueChanges.subscribe(() => {
    //   console.log(`Is form dirty?: ${this.form.dirty}`);
    // });
  }

  onFormChange(form: NgForm) {
    this.store.dispatch(form.dirty ? dirtyForm() : undirtyForm());
  }

  saveHandler(form: NgForm) {
    this.store.dispatch(toggleLoader());
    setTimeout(() => {
      this.saveBook({...form.value});
      this.store.dispatch(toggleLoader());
    }, 1000);
  }

  saveBook(book: Book) {
    if (this.id) {
      book.id = this.id;
    }
    this.store.dispatch(toggleLoader());
    setTimeout(() => {
      this.store.dispatch(fromBookActions.saveBook({data: book}));
      this.store.dispatch(toggleLoader());
      this.router.navigate(['home']);
    }, 1000);
  }

  deleteBook(id: number) {
    this.store.dispatch(toggleLoader());
    setTimeout(() => {
      this.store.dispatch(fromBookActions.deleteBook({id}));
      this.store.dispatch(toggleLoader());
      this.router.navigate(['home']);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.store.dispatch(fromBookActions.loadBook({id: null}));
  }

}
