import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../../model/book';
import {select, Store} from '@ngrx/store';
import {selectAllBooks, selectEntityCount} from '../../store/selectors/books.selector';
import {toggleLoader} from '../../store/actions/ui.actions';
import {Router} from '@angular/router';
import {fromBookActions} from '../../store/actions/books.actions';

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
    <div class="mt-5 row" >
      <div *ngFor="let book of books$ | async" class="col-12 col-md-6 col-lg-4 px-5 py-3 p-md-3">
        <app-item-card [item]="book" (click)="goTo(book?.id)"></app-item-card>
      </div>
    </div>
  `,
  styles: []
})

export class HomeComponent implements OnInit {
  total$: Observable<number> = this.store.pipe(select(selectEntityCount));
  books$: Observable<Book[]> = this.store.pipe(select(selectAllBooks));

  constructor(private store: Store<HomeState>, private route: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(toggleLoader());
    // this.store.dispatch(loadItems());
    // this.store.dispatch(toggleLoader());

    setTimeout(() => {
      this.store.dispatch(fromBookActions.loadBooks());
      this.store.dispatch(toggleLoader());
    }, 1000);
  }

  goTo(id: number) {
    this.route.navigate(['crud/'.concat(String(id))]);
  }

}
