import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWholeSaleOrderLineComponent } from './components/create/create-whole-sale-order-line/create-whole-sale-order-line.component';
import { UpdateWholeSaleOrderLineComponent } from './components/update/update-whole-sale-order-line/update-whole-sale-order-line.component';
import { WholeSaleOrderComponent } from './whole-sale-order.component';

const routes: Routes = [
  { path: '', component: WholeSaleOrderComponent },
  { path: 'create', component: CreateWholeSaleOrderLineComponent },
  {path:'update/:id',component:UpdateWholeSaleOrderLineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WholeSaleOrderRoutingModule {}
