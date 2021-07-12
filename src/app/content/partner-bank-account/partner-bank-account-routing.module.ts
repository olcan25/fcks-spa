import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnerBankAccountComponent } from './partner-bank-account.component';

const routes: Routes = [{ path: '', component: PartnerBankAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerBankAccountRoutingModule { }
