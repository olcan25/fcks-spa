import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TallyInRoutingModule } from './tally-in-routing.module';
import { TallyInComponent } from './tally-in.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LinesComponent } from './local-goods/create/lines/lines.component';
import { HeadComponent } from './local-goods/create/head/head.component';
import { UpdateLocalGoodsHeadComponent } from './local-goods/update/update-local-goods-head/update-local-goods-head.component';
import { UpdateLocalGoodsLinesComponent } from './local-goods/update/update-local-goods-lines/update-local-goods-lines.component';
import { CreateHeadImportGoodsComponent } from './import-goods/create/create-head-import-goods/create-head-import-goods.component';
import { CreateLinesImportGoodsComponent } from './import-goods/create/create-lines-import-goods/create-lines-import-goods.component';
import { UpdateHeadImportGoodsComponent } from './import-goods/update/update-head-import-goods/update-head-import-goods.component';
import { UpdateLinesImportGoodsComponent } from './import-goods/update/update-lines-import-goods/update-lines-import-goods.component';


@NgModule({
  declarations: [TallyInComponent, LinesComponent, HeadComponent, UpdateLocalGoodsHeadComponent, UpdateLocalGoodsLinesComponent, CreateHeadImportGoodsComponent, CreateLinesImportGoodsComponent, UpdateHeadImportGoodsComponent, UpdateLinesImportGoodsComponent],
  imports: [CommonModule, TallyInRoutingModule, SharedModule],
})
export class TallyInModule { }
