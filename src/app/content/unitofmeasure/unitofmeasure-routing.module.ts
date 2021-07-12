import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitofmeasureComponent } from './unitofmeasure.component';

const routes: Routes = [{ path: '', component: UnitofmeasureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitofmeasureRoutingModule { }
