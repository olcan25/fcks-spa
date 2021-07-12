import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateComponent } from './components/update/update.component';

@NgModule({
  declarations: [CategoryComponent, CreateComponent, UpdateComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
})
export class CategoryModule {}
