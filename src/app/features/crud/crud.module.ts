import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudRoutingModule} from './crud-routing.module';
import {CrudComponent} from './crud.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    FormsModule
  ]
})
export class CrudModule { }
