import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {StoreModule} from '@ngrx/store';
import {ItemCardModule} from '../../global/components/item-card/item-card.module';
import {bookReducer} from '../../store/reducers/books.reducer';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature('state', bookReducer),
    ItemCardModule,
    FormsModule,
  ],
  providers: []
})
export class HomeModule {
}
