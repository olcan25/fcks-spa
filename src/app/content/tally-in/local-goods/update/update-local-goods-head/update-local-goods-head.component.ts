import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { Partner } from 'src/app/core/models/partner.model';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';
import { takeUntil } from 'rxjs/operators';
import { INitFormPurchaseOrderService } from 'src/app/core/services/initial-form-services/tally-in-services/init-form-purchase-order.service';
import { InitFormLedgerService } from 'src/app/core/services/initial-form-services/ledger/init-form-ledger.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-local-goods-head',
  templateUrl: './update-local-goods-head.component.html',
  styleUrls: ['./update-local-goods-head.component.css']
})
export class UpdateLocalGoodsHeadComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  @Input() public ledgerWithPurchase: any;
  purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
  updateForm: FormGroup = new FormGroup({});
  partners: Partner[] = [];
  warehouses: Warehouse[] = [];
  warehouseId = new FormControl(0);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private partnerService: PartnerService,
    private warehouseService: WarehouseService,
    private initFormLedgerService: InitFormLedgerService,
    private initFormPurchaseOrderService: INitFormPurchaseOrderService
  ) { }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    this.loadAllForkJoin();
    this.createFormGroup();
    this.load();
  }

  createFormGroup() {
    this.updateForm = this.formBuilder.group({
      ledger: this.initFormLedgerService.initLedger(),
      purchaseOrder: this.initFormPurchaseOrderService.initPurchaseOrder()
    })
  }

  load() {
    this.updateForm.get('ledger')?.patchValue(this.ledgerWithPurchase.ledger);
    this.updateForm
      .get('purchaseOrder')
      ?.patchValue(this.ledgerWithPurchase.purchaseOrder);
    this.warehouseId.patchValue(this.ledgerWithPurchase.warehouseId);
  }

  loadAllForkJoin() {
    const partners$ = this.partnerService.getAll();
    const warehouses$ = this.warehouseService.getAll();
    forkJoin(partners$, warehouses$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.partners = response[0].data),
            (this.warehouses = response[1].data);
        },
        (err) => console.error(err)
      );
  }

  get getControlPurchaseOrder() {
    return this.updateForm.get('purchaseOrder');
  }

  get getControlLedger() {
    return this.updateForm.get('ledger');
  }

  onUpdate() {
    // this.isValidFormSubmitted = false;
    // if (this.updateForm.invalid) {
    //   return;
    // }
    // this.isValidFormSubmitted = true;
    this.purchaseOrderModel = Object.assign({}, this.updateForm.value);
    this.activeModal.close({
      ledger: this.purchaseOrderModel.ledger,
      purchaseOrder: this.purchaseOrderModel.purchaseOrder,
      warehouseId: this.warehouseId.value,
    });
  }
  dismissModal() {
    this.router.navigateByUrl('tallyins');
    this.activeModal.dismiss();
  }


}
