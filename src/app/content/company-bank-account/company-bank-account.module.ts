import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyBankAccountRoutingModule } from './company-bank-account-routing.module';
import { CompanyBankAccountComponent } from './company-bank-account.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CompanyBankAccountComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    CompanyBankAccountRoutingModule,
    SharedModule
  ]
})
export class CompanyBankAccountModule { }
