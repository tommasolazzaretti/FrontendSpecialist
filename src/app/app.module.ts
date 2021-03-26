import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {REDUCER_TOKEN} from './store/reducers';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './global/components/navbar/navbar.component';
import {LoaderComponent} from './global/components/loader/loader.component';
import {BOOK_FEATURE_KEY} from './store/reducers/books.reducer';
import {booksEffects} from './store/effects';
import {CompositionGuard} from './global/guard/can-deactivate.guard';

export interface AppState {
  auth: { token: string, role: string };
  ui: { isLoading: boolean };
  [BOOK_FEATURE_KEY]: any;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // Store modules
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot([...booksEffects]),
    // Route modules
    RouterModule.forRoot([
      {path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
      {
        path: 'crud',
        loadChildren: () => import('./features/crud/crud.module').then(m => m.CrudModule),
        canDeactivate: [CompositionGuard]
      },
    ])
  ],
  providers: [CompositionGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
