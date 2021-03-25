import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {reducers} from './store/reducers';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './global/components/navbar/navbar.component';
import {LoaderComponent} from './global/components/loader/loader.component';
import {Book} from './model/book';

export interface AppState {
  auth: { token: string, role: string };
  ui: { isLoading: boolean };
  items: Book[];
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
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([]),
    RouterModule.forRoot([
      {path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
      {
        path: 'crud',
        loadChildren: () => import('./features/crud/crud.module').then(m => m.CrudModule)
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
