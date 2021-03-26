import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudRoutingModule} from './crud-routing.module';
import {CrudComponent} from './crud.component';
import {FormsModule} from '@angular/forms';
import {ConfirmModalModule} from '../../global/components/confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    FormsModule,
    ConfirmModalModule
  ]
})
export class CrudModule { }
