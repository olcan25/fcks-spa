import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Partner } from 'src/app/core/models/partner.model';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { WholeSaleOrderModel } from 'src/app/core/models/whole-sale-order/whole-sale-order-model.model';
import { LedgerService } from 'src/app/core/services/api-services/ledger/ledger.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';
import { WholeSaleOrderLineService } from 'src/app/core/services/api-services/whole-sale-order-line/whole-sale-order-line.service';
import { WholeSaleOrderService } from 'src/app/core/services/api-services/whole-sale-order/whole-sale-order.service';

@Component({
  selector: 'app-update-whole-sale-order',
  templateUrl: './update-whole-sale-order.component.html',
  styleUrls: ['./update-whole-sale-order.component.css'],
})
export class UpdateWholeSaleOrderComponent implements OnInit, OnDestroy {
  @Input() public ledgerWithWholeSale: any;
  wholeSaleOrderModel: WholeSaleOrderModel = new WholeSaleOrderModel();
  updateForm: FormGroup = new FormGroup({});
  partners: Partner[] = [];
  warehouses: Warehouse[] = [];
  warehouseId = new FormControl(0);
  wholeSaleOrderId: number = 0;
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private partnerService: PartnerService,
    private ledgerService: LedgerService,
    private wholeSaleOrderService: WholeSaleOrderService,
    private wholeSaleOrderLineService: WholeSaleOrderLineService,
    private warehouseService: WarehouseService,
    public datepipe: DatePipe,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllForkJoin();
    this.updateFormGroup();
    this.load();
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

  load() {
    this.updateForm.get('ledger')?.patchValue(this.ledgerWithWholeSale.ledger);
    this.updateForm
      .get('wholeSaleOrder')
      ?.patchValue(this.ledgerWithWholeSale.wholeSaleOrder);
    this.warehouseId.patchValue(this.ledgerWithWholeSale.warehouseId);
  }

  updateFormGroup() {
    this.updateForm = this.fromBuilder.group({
      ledger: this.fromBuilder.group({
        id: [0],
        registerDate: ['', Validators.required],
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
    return this.updateForm.get('wholeSaleOrder');
  }

  get getControlLedger() {
    return this.updateForm.get('ledger');
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
    if (this.updateForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.wholeSaleOrderModel = Object.assign({}, this.updateForm.value);
    this.activeModal.close({
      ledger: this.wholeSaleOrderModel.ledger,
      wholeSaleOrder: this.wholeSaleOrderModel.wholeSaleOrder,
      warehouseId: this.warehouseId.value,
    });
  }
  dismissModal() {
    this.router.navigateByUrl('wholesaleorders');
    this.activeModal.dismiss();
  }
}
