import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../../model/book';
import {select, Store} from '@ngrx/store';
import {selectAllBooks, selectEntityCount} from '../../store/selectors/books.selector';
import {toggleLoader} from '../../store/actions/ui.actions';
import {Router} from '@angular/router';
import {fromBookActions} from '../../store/actions/books.actions';
import {NgForm} from '@angular/forms';

class HomeState {
  items: Book[];
}

@Component({
  selector: 'app-home',
  template: `
    <div class="text-center mt-5">
      <h1>DASHBOARD HOME-PAGE</h1>
      <div class="text-center">TOTAL BOOKS: {{total$ | async}}</div>
    </div>
    <div class="m-3 row">
      <div class="col-12">
        <h3>Reaserch</h3>
      </div>

      <div class="col-12 p-0">
        <form #f="ngForm" (ngSubmit)="search(f)" class="form-row">
          <div class="col-12 col-md-6 col-lg-4">
            <input placeholder="Search title" type="text"
                   name="title" [ngModel] class="form-control" required>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <input placeholder="Search author" type="number"
                   name="author" [ngModel] class="form-control" required>
          </div>
          <div class="col-12 col-lg-2">
            <input type="submit" class="btn btn-primary" value="Seach"/>
          </div>
          <div class="col-12 col-lg-2">
            <input type="submit" class="btn btn-secondary" (click)="goToCrud()" value="Insert New Book"/>
          </div>
        </form>
      </div>
    </div>
    <div class="mt-5 row">
      <div *ngFor="let book of books$ | async" class="col-12 col-md-6 col-lg-4 px-5 py-3 p-md-3">
        <app-item-card [item]="book" (click)="goToCrud(book.id)"></app-item-card>
      </div>
    </div>
  `,
  styles: []
})

export class HomeComponent implements OnInit {
  total$: Observable<number> = this.store.pipe(select(selectEntityCount));
  books$: Observable<Book[]> = this.store.pipe(select(selectAllBooks));

  constructor(private store: Store<HomeState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(toggleLoader());

    setTimeout(() => {
      this.store.dispatch(fromBookActions.loadBooks({}));
      this.store.dispatch(toggleLoader());
    }, 1000);
  }

  goToCrud(id?: number) {
    this.router.navigate([id ? 'crud' : 'crud/'.concat(String(id))]);
  }

  search(form: NgForm) {
    console.log('this.params ', form.value);
    this.store.dispatch(toggleLoader());
    setTimeout(() => {
      this.store.dispatch(fromBookActions.loadBooks({data: form.value}));
      this.store.dispatch(toggleLoader());
    }, 1000);
  }

}
