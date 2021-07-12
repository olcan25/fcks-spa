import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ConditionOfProductComponent } from './product/condition-of-product/condition-of-product.component';
import { ConditionOfPartnerComponent } from './partner/condition-of-partner/condition-of-partner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardOfProductComponent } from './product/card-of-product/card-of-product.component';
import { CardOfPartnerComponent } from './partner/card-of-partner/card-of-partner.component';
import { ConditionOfAccountComponent } from './account/condition-of-account/condition-of-account.component';
import { CardOfAccountComponent } from './account/card-of-account/card-of-account.component';

@NgModule({
  declarations: [
    ReportComponent,
    ConditionOfProductComponent,
    ConditionOfPartnerComponent,
    CardOfProductComponent,
    CardOfPartnerComponent,
    ConditionOfAccountComponent,
    CardOfAccountComponent,
  ],
  imports: [CommonModule, ReportRoutingModule, SharedModule],
})
export class ReportModule {}
