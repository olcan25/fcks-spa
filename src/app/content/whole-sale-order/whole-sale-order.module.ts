import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholeSaleOrderRoutingModule } from './whole-sale-order-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateWholeSaleOrderComponent } from './components/create/create-whole-sale-order/create-whole-sale-order.component';
import { CreateWholeSaleOrderLineComponent } from './components/create/create-whole-sale-order-line/create-whole-sale-order-line.component';
import { WholeSaleOrderComponent } from './whole-sale-order.component';
import { UpdateWholeSaleOrderComponent } from './components/update/update-whole-sale-order/update-whole-sale-order.component';
import { UpdateWholeSaleOrderLineComponent } from './components/update/update-whole-sale-order-line/update-whole-sale-order-line.component';


@NgModule({
  declarations: [WholeSaleOrderComponent,CreateWholeSaleOrderComponent, CreateWholeSaleOrderLineComponent, UpdateWholeSaleOrderComponent, UpdateWholeSaleOrderLineComponent],
  imports: [
    CommonModule,
    WholeSaleOrderRoutingModule,
    SharedModule
  ]
})
export class WholeSaleOrderModule { }
