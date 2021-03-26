import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {StoreModule} from '@ngrx/store';
import {ItemCardModule} from '../../global/components/item-card/item-card.module';
import {bookReducer} from '../../store/reducers/books.reducer';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature('state', bookReducer),
    ItemCardModule,
  ],
  providers: []
})
export class HomeModule {
}
