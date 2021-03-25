import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../../model/book';
import {loadItems} from '../../store/actions/items.actions';
import {select, Store} from '@ngrx/store';
import {getItems, getTotal} from '../../store/selectors/items.selector';
import {toggleLoader} from '../../store/actions/ui.actions';
import {ActivatedRoute, Router} from '@angular/router';

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
    <div class="mt-5 row">
      <div *ngFor="let item of items$ | async" class="col-12 col-md-6 col-lg-4 m-3">
        <app-item-card [item]="item" (click)="goTo(item?.id)"></app-item-card>
      </div>
    </div>
  `,
  styles: []
})

export class HomeComponent {
  items$: Observable<Book[]> = this.store.pipe(select(getItems));
  total$: Observable<number> = this.store.pipe(select(getTotal));

  constructor(private store: Store<HomeState>, private route: Router) {
    const self = this;
    this.items$.subscribe(result => console.log('this.items$.length :', result.length));

    this.store.dispatch(toggleLoader());
    // this.store.dispatch(loadItems());
    // this.store.dispatch(toggleLoader());

    setTimeout(() => {
      self.store.dispatch(loadItems());
      self.store.dispatch(toggleLoader());
    }, 1000);
  }

  goTo(id: number) {
    this.route.navigate(['crud/'.concat(String(id))]);
  }

}
