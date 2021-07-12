import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { DtoCardOfProduct } from 'src/app/core/models/product/card-of-product.model';
import { Product } from 'src/app/core/models/product/product.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { ProductService } from 'src/app/core/services/api-services/product/product.service';
import { ReportService } from 'src/app/core/services/api-services/report/report.service';

@Component({
  selector: 'app-card-of-product',
  templateUrl: './card-of-product.component.html',
  styleUrls: ['./card-of-product.component.css'],
})
export class CardOfProductComponent implements OnInit, OnDestroy {
  cardOfProducts: DtoCardOfProduct[] = [];
  product: Product = new Product();
  cols: any[] = [];
  balance: number[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService,
    private alertifyService: AlertifyService,
    private productService: ProductService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (params) => (
          this.loadAll(params['id']), this.loadGetByProductId(params['id'])
        )
      );
    this.cols = [
      { field: 'registerDate' },
      { field: 'partnerName' },
      { field: 'inQuantity' },
      { field: 'outQuantity' },
      { field: 'balance' },
      { field: 'unitPrice' },
      { field: 'unitPriceWithVat' },
    ];
  }

  loadAll(id: number) {
    this.reportService
      .getByProductIdCardOfProducts(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.cardOfProducts = response.data),
            (this.balance = response.data.map((x) => x.balance));
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  loadAllBetweenDate(starDate: any, endDate: any) {
    let productId: number = 0;
    this.activatedRoute.params.subscribe((params) => {
      productId = params['id'];
    });
    this.reportService
      .getByProductIdCardOfProductsPost(productId, starDate, endDate)

      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.cardOfProducts = response.data),
            (this.balance = response.data.map((x) => x.balance));
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  loadGetByProductId(id: number) {
    this.productService.getById(id).subscribe((response) => {
      this.product = response.data;
    });
  }

  totalBalance(index: number): number {
    let value = 0;
    index = index + 1;

    for (let i = 0; i < index; i++) {
      value += this.balance[i];
    }
    return value;
  }

  clear(table: Table) {
    table.clear();
  }
}
