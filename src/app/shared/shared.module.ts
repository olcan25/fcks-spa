import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { SumReducePipe } from './pipes/sum-reduce.pipe';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ChartsModule } from 'ng2-charts';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [SumReducePipe],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    RouterModule,
    AccordionModule,
    TableModule,
  ],
  exports: [
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    RouterModule,
    SumReducePipe,
    AccordionModule,
    TableModule,
    ChartsModule,
    DropdownModule,
  ],
})
export class SharedModule {}
