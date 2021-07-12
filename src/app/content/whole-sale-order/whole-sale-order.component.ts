import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';
import { WholeSaleOrderLineService } from 'src/app/core/services/api-services/whole-sale-order-line/whole-sale-order-line.service';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'jquery';
import { Table } from 'primeng/table';
import { combineLatest, concat, forkJoin, Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { GetDtoCompanyBankAccount } from 'src/app/core/models/company-bank-account/getDtoCompanyBankAccount';
import { Company } from 'src/app/core/models/company.model';
import { InvoiceHead } from 'src/app/core/models/invoice/invoice-head.model';
import { InvoiceLine } from 'src/app/core/models/invoice/invoice-line.model';
import { GetWholeSaleOrderDto } from 'src/app/core/models/whole-sale-order/whole-sale-order-dto.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { CompanyBankAccountService } from 'src/app/core/services/api-services/company-bank-account/company-bank-account.service';
import { CompanyService } from 'src/app/core/services/api-services/company/company.service';
import { InvoiceHeadService } from 'src/app/core/services/api-services/invoice-service/invoice-head.service';
import { InvoiceLineService } from 'src/app/core/services/api-services/invoice-service/invoice-line.service';
import { TallyOutService } from 'src/app/core/services/api-services/tally-out/tally-out.service';
import { WholeSaleOrderService } from 'src/app/core/services/api-services/whole-sale-order/whole-sale-order.service';
import { SaleGoodsInvoiceService } from 'src/app/core/services/invoice-service/sale-goods-invoice.service';

@Component({
  selector: 'app-whole-sale-order',
  templateUrl: './whole-sale-order.component.html',
  styleUrls: ['./whole-sale-order.component.css'],
})
export class WholeSaleOrderComponent implements OnInit, OnDestroy {
  getWholeSaleOrders: GetWholeSaleOrderDto[] = [];
  company: Company = new Company();
  warehouse: Warehouse = new Warehouse();
  getDtoCompanyBankAccounts: GetDtoCompanyBankAccount[] = [];
  invoiceHead: InvoiceHead = new InvoiceHead();
  invoiceLines: InvoiceLine[] = [];
  cols: any[] = [];
  get: GetWholeSaleOrderDto = new GetWholeSaleOrderDto();
  private ngUnSubscribe = new Subject<void>();

  constructor(
    private tallyOutService: TallyOutService,
    private wholeSaleOrderService: WholeSaleOrderService,
    private wholeSaleOrderLineService: WholeSaleOrderLineService,
    private sweetAlertService: SweetalertService,
    private saleGoodsInvoiceService: SaleGoodsInvoiceService,
    private companyService: CompanyService,
    private invoiceHeadService: InvoiceHeadService,
    private invoiceLineService: InvoiceLineService,
    private companyBankAccountService: CompanyBankAccountService,
    private warehouseService: WarehouseService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'ledgerId' },
      { field: 'registerDate' },
      { field: 'wholeSaleOrderNumber' },
      { field: 'partnerName' },
      { field: 'isPaid' },
      { field: 'amount' },
      { field: 'amountVatValue' },
      { field: 'amountWithVat' },
    ];
    this.loadAll();
    this.loadCompanyWithBankAccounts();
  }

  loadAll() {
    this.wholeSaleOrderService
      .getAllWholeSaleOrdersDto()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((response) => {
        (this.getWholeSaleOrders = response.data),
          this.getWholeSaleOrders.forEach(
            (sale) => (sale.registerDate = new Date(sale.registerDate))
          );
      });
  }

  trackByFn = (
    index: number,
    getWholeSaleOrderDto: GetWholeSaleOrderDto
  ): number => getWholeSaleOrderDto.id;

  loadCompanyWithBankAccounts() {
    const company$ = this.companyService.getFirstCompany();
    const companyBankAccounts$ =
      this.companyBankAccountService.getAllWithCompanyBank();
    forkJoin(company$, companyBankAccounts$).subscribe((response) => {
      (this.company = response[0].data),
        (this.getDtoCompanyBankAccounts = response[1].data);
    });
  }

  generateInvoice(id: number) {
    const wholeSaleOrderLines$ = this.wholeSaleOrderLineService
      .getByWholeSaleOrderId(id)
      .pipe(
        concatMap((x) => this.warehouseService.getById(x.data[0].warehouseId))
      );
    const invoiceHead$ = this.invoiceHeadService.getById(id);
    const invoceiLines$ = this.invoiceLineService.getByIdInvoiceLines(id);

    forkJoin(wholeSaleOrderLines$, invoiceHead$, invoceiLines$).subscribe(
      (response) => {
        this.saleGoodsInvoiceService.saleInvoiceDownload(
          this.company,
          response[0].data,
          this.getDtoCompanyBankAccounts,
          response[1].data,
          response[2].data
        );
      }
    );
    // combineLatest(
    //   this.invoiceHeadService.getById(id),
    //   this.invoiceLineService.getByIdInvoiceLines(id)
    // ).subscribe(([invoiceHead, invoiceLines]) => {
    //   this.saleGoodsInvoiceService.saleInvoiceDownload(
    //     this.company,
    //     this.warehouse,
    //     this.getDtoCompanyBankAccounts,
    //     invoiceHead.data,
    //     invoiceLines.data
    //   );
    // });
  }

  delete(id: number) {
    this.sweetAlertService.confrim(() =>
      this.tallyOutService
        .delete(id)
        .pipe(takeUntil(this.ngUnSubscribe))
        .subscribe(
          (response) => this.alertifyService.success(response.message),
          (err) => this.alertifyService.error(err),
          () => this.loadAll()
        )
    );
  }

  clear(table: Table) {
    table.clear();
  }
}
