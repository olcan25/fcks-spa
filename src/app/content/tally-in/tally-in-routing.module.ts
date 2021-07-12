import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLinesImportGoodsComponent } from './import-goods/create/create-lines-import-goods/create-lines-import-goods.component';
import { LinesComponent } from './local-goods/create/lines/lines.component';
import { UpdateLocalGoodsLinesComponent } from './local-goods/update/update-local-goods-lines/update-local-goods-lines.component';
import { TallyInComponent } from './tally-in.component';
import { UpdateLinesImportGoodsComponent } from './import-goods/update/update-lines-import-goods/update-lines-import-goods.component';

const routes: Routes = [
  { path: '', component: TallyInComponent },
  { path: 'localgoods/create', component: LinesComponent },
  { path: 'localgoods/update/:id', component: UpdateLocalGoodsLinesComponent },
  { path: 'importgoods/create', component: CreateLinesImportGoodsComponent },
  { path: 'importgoods/update/:id', component: UpdateLinesImportGoodsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TallyInRoutingModule { }
