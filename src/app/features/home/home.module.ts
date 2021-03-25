import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {ItemsService} from '../../global/services/items.service';
import {ItemsEffects} from '../../store/effects/items.effects';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ItemCardModule} from '../../global/components/item-card/item-card.module';
import {reducers} from '../../store/reducers';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature('state', reducers),
    EffectsModule.forFeature([
      ItemsEffects
    ]),
    ItemCardModule,
  ],
  providers: [
    ItemsService
  ]
})
export class HomeModule { }
