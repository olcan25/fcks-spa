import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Company } from 'src/app/core/models/company.model';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { CompanyService } from 'src/app/core/services/api-services/company/company.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  warehouses: Warehouse[] = [];
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private companyService: CompanyService,
    private warehouseService: WarehouseService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    const companies$ = this.companyService.getAll();
    const warehouses$ = this.warehouseService.getAll();
    forkJoin(companies$, warehouses$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.companies = response[0].data),
            (this.warehouses = response[1].data);
        },
        (err) => console.error(err),
        () => console.log('Islem Tamam')
      );
  }
}
