import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Partner } from 'src/app/core/models/partner.model';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css'],
})
export class CreatePurchaseOrderComponent implements OnInit, OnDestroy {
  purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
  addForm: FormGroup = new FormGroup({});
  partners: Partner[] = [];
  warehouses: Warehouse[] = [];
  isValidFormSubmitted = false;
  warehouseId = new FormControl(0);
  private ngUnsubscribe = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private config: NgSelectConfig,
    private partnerService: PartnerService,
    private warehouseService: WarehouseService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {
    this.config.notFoundText = 'Bulunamadi';
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllForkJoin();
    this.createFormGroup();
  }

  loadAllForkJoin() {
    const partners$ = this.partnerService.getAll();
    const warehouses$ = this.warehouseService.getAll();
    forkJoin(partners$, warehouses$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        (this.partners = response[0].data),
          (this.warehouses = response[1].data);
      });
  }
  createFormGroup() {
    this.addForm = this.fromBuilder.group({
      ledger: this.fromBuilder.group({
        id: [0],
        registerDate: [
          formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
          [Validators.required],
        ],
        description: [''],
      }),
      purchaseOrder: this.fromBuilder.group({
        id: [0],
        ledgerId: [0],
        partnerId: [0, [Validators.min(1)]],
        invoiceNumber: ['', [Validators.required]],
        note: [''],
        description: [''],
        isPaid: [false],
      }),
    });
  }

  get getControlPurchaseOrder() {
    return this.addForm.get('purchaseOrder');
  }

  get getControlLedger() {
    return this.addForm.get('ledger');
  }

  onAdd() {
    this.isValidFormSubmitted = false;
    if (this.addForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.purchaseOrderModel = Object.assign({}, this.addForm.value);
    this.activeModal.close({
      purchaseOrderModel: this.purchaseOrderModel,
      warehouseId: this.warehouseId.value,
    });
  }

  dismissModal() {
    this.router.navigateByUrl('purchaseorders');
    this.activeModal.dismiss();
  }
}
