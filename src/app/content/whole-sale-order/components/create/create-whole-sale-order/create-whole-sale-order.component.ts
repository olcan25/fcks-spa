import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Partner } from 'src/app/core/models/partner.model';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { WholeSaleOrderModel } from 'src/app/core/models/whole-sale-order/whole-sale-order-model.model';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';

@Component({
  selector: 'app-whole-sale-order',
  templateUrl: './create-whole-sale-order.component.html',
  styleUrls: ['./create-whole-sale-order.component.css'],
})
export class CreateWholeSaleOrderComponent implements OnInit, OnDestroy {
  wholeSaleOrderModel: WholeSaleOrderModel = new WholeSaleOrderModel();
  addForm: FormGroup = new FormGroup({});
  partners: Partner[] = [];
  warehouses: Warehouse[] = [];
  warehouseId = new FormControl(0);
  private ngUnSubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private config: NgSelectConfig,
    private partnerService: PartnerService,
    private warehouseService: WarehouseService,
    private router:Router
  ) {
    this.config.notFoundText = 'Bulunamadi';
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllForkJoin();
    this.createFormGroup();
  }

  loadAllForkJoin() {
    const partners$ = this.partnerService.getAll();
    const warehouses$ = this.warehouseService.getAll();
    forkJoin(partners$, warehouses$)
      .pipe(takeUntil(this.ngUnSubscribe))
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
          Validators.required,
        ],
        description: [''],
      }),
      wholeSaleOrder: this.fromBuilder.group({
        id: [0],
        ledgerId: [0],
        partnerId: [0, [Validators.min(1)]],
        wholeSaleOrderNumber: [0],
        note: [''],
        description: [''],
        foreign: [false],
        isPaid: [false],
      }),
    });
  }

  get getControlWholeSaleOrder() {
    return this.addForm.get('wholeSaleOrder');
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
    this.wholeSaleOrderModel = Object.assign({}, this.addForm.value);
    this.activeModal.close({
      wholeSaleOrderModel: this.wholeSaleOrderModel,
      warehouseId: this.warehouseId.value,
    });
  }
  dismissModal() {
    this.router.navigateByUrl('wholesaleorders');
    //this.router.navigateByUrl('purchaseorders');
    this.activeModal.dismiss();
  }
}
