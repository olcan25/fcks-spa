import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitofmeasureRoutingModule } from './unitofmeasure-routing.module';
import { UnitofmeasureComponent } from './unitofmeasure.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UnitofmeasureComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    UnitofmeasureRoutingModule,
    SharedModule
  ]
})
export class UnitofmeasureModule { }
