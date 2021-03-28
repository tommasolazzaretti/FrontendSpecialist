import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../../../app.module';
import {BOOK_FEATURE_KEY} from '../../../store/reducers/books.reducer';

@Component({
  selector: 'app-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="layer" *ngIf="isLoading | async">
      <div class="spinner-container">
        <div class="m-auto spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {

  isLoading: Observable<any>;
  // loaded$: Observable<boolean> = this.store.pipe(select(selectEntityLoaded));

  constructor(private store: Store<AppState>) {

    this.isLoading = this.store.pipe(
      select((state: AppState) => state.ui.isLoading)
    );

    this.isLoading.subscribe(data => console.log(data));
  }

  ngOnInit(): void {
  }

}
