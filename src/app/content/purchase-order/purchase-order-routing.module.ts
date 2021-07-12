import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePurchaseOrderLineComponent } from './components/create/create-purchase-order-line/create-purchase-order-line.component';
import { UpdatePurchaseOrderLinesComponent } from './components/update/update-purchase-order-lines/update-purchase-order-lines.component';

import { PurchaseOrderComponent } from './purchase-order.component';

const routes: Routes = [
  { path: '', component: PurchaseOrderComponent },
  { path: 'lines', component: CreatePurchaseOrderLineComponent },
  { path:'lines/update/:id',component:UpdatePurchaseOrderLinesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrderRoutingModule {}
