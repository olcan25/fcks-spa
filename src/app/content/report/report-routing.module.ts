import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardOfAccountComponent } from './account/card-of-account/card-of-account.component';
import { ConditionOfAccountComponent } from './account/condition-of-account/condition-of-account.component';
import { CardOfPartnerComponent } from './partner/card-of-partner/card-of-partner.component';
import { ConditionOfPartnerComponent } from './partner/condition-of-partner/condition-of-partner.component';
import { CardOfProductComponent } from './product/card-of-product/card-of-product.component';
import { ConditionOfProductComponent } from './product/condition-of-product/condition-of-product.component';
import { ReportComponent } from './report.component';

const routes: Routes = [
  { path: '', component: ReportComponent },
  { path: 'conditionofproducts', component: ConditionOfProductComponent },
  { path: 'cardofproducts/:id', component: CardOfProductComponent },
  { path: 'conditionofpartners', component: ConditionOfPartnerComponent },
  { path: 'cardofpartners/:id', component: CardOfPartnerComponent },
  { path: 'conditionofaccounts', component: ConditionOfAccountComponent },
  { path: 'cardofaccounts/:id', component: CardOfAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
