import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './partner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { DetailComponent } from './components/detail/detail.component';


@NgModule({
  declarations: [PartnerComponent, CreateComponent, UpdateComponent, DetailComponent],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    SharedModule,
  ]
})
export class PartnerModule { }
