import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetPurchaseOrderDto } from 'src/app/core/models/purchase-order/get-purchase-order-dto.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { PurchaseOrderService } from 'src/app/core/services/api-services/purchase-order/purchase-order.service';
import { TallyInService } from 'src/app/core/services/api-services/tally-in/tally-in.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit, OnDestroy {
  getPurchaseOrderDtos: GetPurchaseOrderDto[] = [];
  private ngUnsubscribe = new Subject<void>();
  cols: any[] = [];
  constructor(
    private tallyInService: TallyInService,
    private purchaseOrderService: PurchaseOrderService,
    private sweetAlertService: SweetalertService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // data: true , format: `dd/MM/yyyy`,type:'date'

  ngOnInit(): void {
    this.loadAll();
    this.cols = [
      { field: 'ledgerId', header: 'ID' },
      { field: 'registerDate', header: 'Kayit Tarihi' },
      { field: 'invoiceNumber', header: 'Fatura No' },
      { field: 'partnerName', header: 'Partner Ismi' },
      { field: 'isPaid', header: 'Odeme' },
      { field: 'amount', header: " KDV'siz Tutar" },
      { field: 'amountVatValue', header: 'KDV Tutari' },
      { field: 'amountWithVat', header: "KDV'li Tutar" },
    ];
  }

  loadAll() {
    this.purchaseOrderService
      .getAllPurchaseOrderDtos()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.getPurchaseOrderDtos = response.data),
            this.getPurchaseOrderDtos.forEach(
              (purchase) =>
                (purchase.registerDate = new Date(purchase.registerDate))
            );
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  trackByFn = (
    index: number,
    getPurchaseOrderDto: GetPurchaseOrderDto
  ): number => getPurchaseOrderDto.id;

  delete(id: number) {
    this.sweetAlertService.confrim(() =>
      this.tallyInService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => this.alertifyService.success(response.message),
          (err) => console.error(err),
          () => this.loadAll()
        )
    );
  }

  clear(table: Table) {
    table.clear();
  }
}
