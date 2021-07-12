import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompareDate } from 'src/app/core/models/compare-date.model';
import { DtoCardOfProduct } from 'src/app/core/models/product/card-of-product.model';
import { DtoConditionOfProduct } from 'src/app/core/models/product/condition-of-product.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { ReportService } from 'src/app/core/services/api-services/report/report.service';

@Component({
  selector: 'app-condition-of-product',
  templateUrl: './condition-of-product.component.html',
  styleUrls: ['./condition-of-product.component.css'],
})
export class ConditionOfProductComponent implements OnInit, OnDestroy {
  dtoConditionOfProducts: DtoConditionOfProduct[] = [];
  cols: any[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private reportService: ReportService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllConditionOfProducts();
    this.cols = [
      { field: 'productName', header: 'Urun Ismi' },
      { field: 'inQuantity', header: 'Giris' },
      { field: 'outQuantity', header: 'Cikis' },
      { field: 'balance' },
      { field: 'inAvarageUnitPrice', header: 'Ortalama Fiyat' },
      { field: 'inAvarageAmount', header: 'Ortalama Tutar' },
      { field: 'outUnitPrice', header: 'Cikis Fiyat' },
      { field: 'outAmount', header: 'Cikis KDV Tutar' },
    ];
  }

  loadAllConditionOfProducts() {
    this.reportService
      .getAllConditionOfProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.dtoConditionOfProducts = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  loadAllBetweenDate(starDate: any, endDate: any) {
    this.reportService
      .getAllConditionOfProductsBetweenDate(starDate, endDate)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.dtoConditionOfProducts = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  clear(table: Table) {
    table.clear();
  }
}
