import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Currency } from 'src/app/core/models/currency/currency.model';
import { Partner } from 'src/app/core/models/partner.model';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { CurrencyService } from 'src/app/core/services/api-services/currency/currency.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';
import { InitFormLedgerService } from 'src/app/core/services/initial-form-services/ledger/init-form-ledger.service';
import { INitFormPurchaseOrderService } from 'src/app/core/services/initial-form-services/tally-in-services/init-form-purchase-order.service';

@Component({
  selector: 'app-create-head-import-goods',
  templateUrl: './create-head-import-goods.component.html',
  styleUrls: ['./create-head-import-goods.component.css']
})
export class CreateHeadImportGoodsComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
  addForm: FormGroup = new FormGroup({});
  partners: Partner[] = [];
  warehouses: Warehouse[] = [];
  currencies: Currency[] = []
  isValidFormSubmitted = false;
  warehouseId = new FormControl(0);

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private config: NgSelectConfig,
    private partnerService: PartnerService,
    private warehouseService: WarehouseService,
    private alertifyService: AlertifyService,
    private router: Router,
    private currencyService: CurrencyService,
    private initFormLedgerService: InitFormLedgerService,
    private initFormPurchaseOrderService: INitFormPurchaseOrderService
  ) {
    this.config.notFoundText = 'Bulunamadi';
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllForkJoin()
    this.createFormGroup()
  }

  loadAllForkJoin() {
    const partners$ = this.partnerService.getAll();
    const warehouses$ = this.warehouseService.getAll();
    const currencies$ = this.currencyService.getAll();
    forkJoin(partners$, warehouses$, currencies$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        (this.partners = response[0].data),
          (this.warehouses = response[1].data),
          (this.currencies = response[2].data)
      });
  }

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
      ledger: this.initFormLedgerService.initLedger(),
      purchaseOrder: this.initFormPurchaseOrderService.initImportPurchaseOrder()
    })
  }

  get getControlPurchaseOrder() {
    return this.addForm.get('purchaseOrder');
  }

  get getControlLedger() {
    return this.addForm.get('ledger');
  }

  onAdd() {
    // this.isValidFormSubmitted = false;
    // if (this.addForm.invalid) {
    //   return;
    // }
    // this.isValidFormSubmitted = true;
    this.purchaseOrderModel = Object.assign({}, this.addForm.value);
    this.activeModal.close({
      purchaseOrderModel: this.purchaseOrderModel,
      warehouseId: this.warehouseId.value,
    });
  }

  dismissModal() {
    this.router.navigateByUrl('tallyins');
    this.activeModal.dismiss();
  }
}
