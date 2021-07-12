import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/core/models/product/product.model';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { Vat } from 'src/app/core/models/vat.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { ProductService } from 'src/app/core/services/api-services/product/product.service';
import { TallyInService } from 'src/app/core/services/api-services/tally-in/tally-in.service';
import { VatService } from 'src/app/core/services/api-services/vat/vat.service';
import { PurchaseCalculationService } from '../../../services/purchase-calculation.service';
import { CreateFormGroupService } from '../../../services/purchase-create-form-group.service';
import { UpdatePurchaseOrderComponent } from '../update-purchase-order/update-purchase-order.component';
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { ReactiveFormCalculationService } from 'src/app/core/services/calculation/reactive-form-calculation.service';
import { LedgerService } from 'src/app/core/services/api-services/ledger/ledger.service';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';

@Component({
  selector: 'app-update-purchase-order-lines',
  templateUrl: './update-purchase-order-lines.component.html',
  styleUrls: ['./update-purchase-order-lines.component.css'],
})
export class UpdatePurchaseOrderLinesComponent implements OnInit, OnDestroy {
  purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
  updateForm: FormGroup = new FormGroup({});
  products: Product[] = [];
  vats: Vat[] = [];
  warehouseId: number = 0;
  sumTotals: number[] = [];
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    private modalService: NgbModal,
    private fromBuilder: FormBuilder,
    private productService: ProductService,
    private vatService: VatService,
    private createFormGroupService: CreateFormGroupService,
    private purchaseCalculationService: PurchaseCalculationService,
    private tallyInService: TallyInService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reactiveFormCalculationService: ReactiveFormCalculationService,
    private ledgerService: LedgerService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.load();
    this.createFormArray();
    this.createFormArrayHundred();
    this.loadAllForkJoin();
    this.calculate();
  }

  load() {
    this.activatedRoute.params.subscribe((params) => {
      this.ledgerService
        .getLedgerWithPurchase(params['id'])
        .subscribe((response: SingleResponseModel<PurchaseOrderModel>) => {
          this.purchaseOrderModel = response.data;
          this.warehouseId = response.data.purchaseOrderLines[0].warehouseId;
          this.loopAddFormArray(response.data.purchaseOrderLines.length),
            this.updateForm
              .get('purchaseOrderLines')
              ?.patchValue(response.data.purchaseOrderLines);
          this.openCreateModal();
        });
    });
  }

  loadAllForkJoin() {
    const products$ = this.productService.getAll();
    const vats$ = this.vatService.getAll();
    forkJoin(products$, vats$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.products = response[0].data), (this.vats = response[1].data);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  calculate() {
    this.sumTotals = this.reactiveFormCalculationService.sumTotal(
      this.updateForm,
      'purchaseOrderLines'
    );
  }

  getProductId(i: number) {
    const productId = this.updateForm.value.purchaseOrderLines[i].productId;
    this.productService
      .getById(productId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) =>
          this.purchaseOrderLines
            .at(i)
            .get('vatId')
            ?.setValue(response.data.vatId),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  calculateUnitPirceWithVat(i: number, value: any) {
    this.purchaseCalculationService.calculateUnitPirceWithVat(
      this.updateForm,
      this.purchaseOrderLines,
      i,
      value
    );
  }

  calculateAmountWithVat(i: number, value: any) {
    this.purchaseCalculationService.calculateAmountWithPrice(
      this.updateForm,
      this.purchaseOrderLines,
      i,
      value
    );
  }

  createFormArray() {
    this.updateForm = this.fromBuilder.group({
      purchaseOrderLines: this.fromBuilder.array([
        this.createFormGroupService.initPurchaseOrderLines(),
      ]),
    });
  }

  get purchaseOrderLines(): FormArray {
    return <FormArray>this.updateForm.controls.purchaseOrderLines;
  }

  addPurchaseOrderLinesFormArray() {
    this.purchaseOrderLines.push(
      this.createFormGroupService.initPurchaseOrderLines()
    );
  }

  removePurchaseOrderLinesFormArray(i: number) {
    this.purchaseOrderLines.removeAt(i);
  }

  createFormArrayHundred() {
    for (let i = 0; i < 50; i++) {
      this.purchaseOrderLines.push(
        this.createFormGroupService.initPurchaseOrderLines()
      );
    }
  }

  openCreateModal() {
    const modalRef = this.modalService.open(UpdatePurchaseOrderComponent, {
      backdrop: 'static',
      keyboard: true,
    });
    modalRef.componentInstance.ledgerWithPurchase = {
      ledger: this.purchaseOrderModel.ledger,
      purchaseOrder: this.purchaseOrderModel.purchaseOrder,
      warehouseId: this.warehouseId,
    };
    modalRef.closed.subscribe((response) => {
      (this.purchaseOrderModel.ledger = response.ledger),
        (this.purchaseOrderModel.purchaseOrder = response.purchaseOrder),
        (this.warehouseId = response.warehouseId);
    });
  }

  loopAddFormArray(value: number) {
    for (let i = 1; i < value; i++) {
      this.addPurchaseOrderLinesFormArray();
    }
  }

  onUpdate() {
    this.purchaseOrderModel.purchaseOrderLines = Object.assign(
      {},
      this.updateForm.value
    ).purchaseOrderLines;
    for (
      let i = 0;
      i < this.purchaseOrderModel.purchaseOrderLines.length;
      i++
    ) {
      this.purchaseOrderModel.purchaseOrderLines[i].warehouseId =
        this.warehouseId;
    }
    this.tallyInService
      .update(this.purchaseOrderModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          this.alertifyService.success(response.message);
        },
        (err) => {
          this.alertifyService.error(err);
        },
        () => {
          console.log('Islem Gerceklesti'),
            this.router.navigateByUrl('purchaseorders');
        }
      );
  }
}
