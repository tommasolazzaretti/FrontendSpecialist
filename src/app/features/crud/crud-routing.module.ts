import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrudComponent} from './crud.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CrudComponent
      },
      {
        path: ':id',
        component: CrudComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule {
}
