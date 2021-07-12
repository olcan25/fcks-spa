import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { CreateComponent } from './components/create/create/create.component';
import { UpdateComponent } from './components/update/update/update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PaymentComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule { }
