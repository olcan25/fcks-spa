import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LedgerAccountComponent } from './ledger-account.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  { path: '', component: LedgerAccountComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LedgerAccountRoutingModule {}
