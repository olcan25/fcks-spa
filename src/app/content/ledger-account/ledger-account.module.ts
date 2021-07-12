import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerAccountRoutingModule } from './ledger-account-routing.module';
import { LedgerAccountComponent } from './ledger-account.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LedgerAccountComponent, CreateComponent, UpdateComponent],
  imports: [CommonModule, LedgerAccountRoutingModule, SharedModule],
})
export class LedgerAccountModule {}
