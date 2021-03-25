import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {Store} from '@ngrx/store';
import {addItem, deleteItem, getItem} from '../../store/actions/items.actions';
import {AppState} from '../../app.module';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit {
  id: number = null;

  store$ = this.store.select('items');

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    const self = this;
    this.route.params.subscribe(params => {
      this.id = params.id;

      // this.store.pipe(
      //   select(selectById, self.id)
      // ).subscribe((item) => console.log('item : ', item));

      this.store.dispatch(getItem({id: this.id}));
      // console.log('this.store : ', this.store.items);
    });
  }

  ngOnInit(): void {
  }

  saveHandler(form: NgForm) {
    this.saveItem({...form.value});
  }

  saveItem(item: Partial<Book>) {
    this.store.dispatch(addItem({item}));
  }

  deleteItem(id: number) {
    this.store.dispatch(deleteItem({id}));
  }

}
