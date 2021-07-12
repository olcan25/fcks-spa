import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyBankAccountComponent } from './company-bank-account.component';

const routes: Routes = [{ path: '', component: CompanyBankAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyBankAccountRoutingModule { }
