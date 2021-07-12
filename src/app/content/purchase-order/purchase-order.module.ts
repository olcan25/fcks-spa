import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderComponent } from './purchase-order.component';
import { CreatePurchaseOrderComponent } from './components/create/create-purchase-order/create-purchase-order.component';
import { CreatePurchaseOrderLineComponent } from './components/create/create-purchase-order-line/create-purchase-order-line.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdatePurchaseOrderComponent } from './components/update/update-purchase-order/update-purchase-order.component';
import { UpdatePurchaseOrderLinesComponent } from './components/update/update-purchase-order-lines/update-purchase-order-lines.component';


@NgModule({
  declarations: [PurchaseOrderComponent, CreatePurchaseOrderComponent, CreatePurchaseOrderLineComponent, UpdatePurchaseOrderComponent, UpdatePurchaseOrderLinesComponent],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    SharedModule
  ]
})
export class PurchaseOrderModule { }
