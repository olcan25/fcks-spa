import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerBankAccountRoutingModule } from './partner-bank-account-routing.module';
import { PartnerBankAccountComponent } from './partner-bank-account.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PartnerBankAccountComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    PartnerBankAccountRoutingModule,
    SharedModule
  ]
})
export class PartnerBankAccountModule { }
