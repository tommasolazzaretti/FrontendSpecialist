import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <app-loader></app-loader>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {

}
