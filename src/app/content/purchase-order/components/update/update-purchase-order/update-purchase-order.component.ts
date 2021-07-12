import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Partner } from 'src/app/core/models/partner.model';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { DatePipe } from '@angular/common';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-purchase-order',
  templateUrl: './update-purchase-order.component.html',
  styleUrls: ['./update-purchase-order.component.css'],
})
export class UpdatePurchaseOrderComponent implements OnInit, OnDestroy {
  @Input() public ledgerWithPurchase: any;
  purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
  updateForm: FormGroup = new FormGroup({});
  partners: Partner[] = [];
  warehouses: Warehouse[] = [];
  warehouseId = new FormControl(0);
  purchaseOrderId: number = 0;
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private partnerService: PartnerService,
    private warehouseService: WarehouseService,
    public datepipe: DatePipe,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.updateFormGroup();
    this.loadAllForkJoin();
    this.load();
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

  load() {
    this.updateForm.get('ledger')?.patchValue(this.ledgerWithPurchase.ledger);
    this.updateForm
      .get('purchaseOrder')
      ?.patchValue(this.ledgerWithPurchase.purchaseOrder);
    this.warehouseId.patchValue(this.ledgerWithPurchase.warehouseId);
  }

  updateFormGroup() {
    this.updateForm = this.fromBuilder.group({
      ledger: this.fromBuilder.group({
        id: [0],
        registerDate: ['', [Validators.required]],
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
    return this.updateForm.get('purchaseOrder');
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
    this.purchaseOrderModel = Object.assign({}, this.updateForm.value);
    this.activeModal.close({
      ledger: this.purchaseOrderModel.ledger,
      purchaseOrder: this.purchaseOrderModel.purchaseOrder,
      warehouseId: this.warehouseId.value,
    });
  }
  dismissModal() {
    this.router.navigateByUrl('purchaseorders');
    this.activeModal.dismiss();
  }
}
