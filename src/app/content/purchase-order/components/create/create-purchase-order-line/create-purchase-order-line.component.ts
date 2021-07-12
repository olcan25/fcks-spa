import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product/product.model';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { Vat } from 'src/app/core/models/vat.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { ProductService } from 'src/app/core/services/api-services/product/product.service';
import { TallyInService } from 'src/app/core/services/api-services/tally-in/tally-in.service';
import { VatService } from 'src/app/core/services/api-services/vat/vat.service';
import { ReactiveFormCalculationService } from 'src/app/core/services/calculation/reactive-form-calculation.service';
import { PurchaseCalculationService } from '../../../services/purchase-calculation.service';
import { CreateFormGroupService } from '../../../services/purchase-create-form-group.service';
import { CreatePurchaseOrderComponent } from '../create-purchase-order/create-purchase-order.component';

@Component({
  selector: 'app-create-purchase-order-line',
  templateUrl: './create-purchase-order-line.component.html',
  styleUrls: ['./create-purchase-order-line.component.css'],
})
export class CreatePurchaseOrderLineComponent implements OnInit, OnDestroy {
  purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
  addForm: FormGroup = new FormGroup({});
  products: Product[] = [];
  product: Product = new Product();
  vats: Vat[] = [];
  warehouseId: number = 0;
  requestArray: [] = [];
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
    private router: Router,
    private reactiveFormCalculationService: ReactiveFormCalculationService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.createFormArray();
    this.createFormArrayHundred();
    this.laodAllForkJoin();
    this.openCreateModal();
    this.calculate();
  }

  getProductId(i: number) {
    const productId = this.addForm.value.purchaseOrderLines[i].productId;
    this.productService
      .getById(productId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          this.purchaseOrderLines
            .at(i)
            .get('vatId')
            ?.patchValue(response.data.vatId),
            this.purchaseOrderLines
              .at(i)
              .get('unitPriceWithVat')
              ?.patchValue(response.data.defaultBuyingPrice);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Basarili')
      );
  }

  calculate() {
    this.sumTotals = this.reactiveFormCalculationService.sumTotal(
      this.addForm,
      'purchaseOrderLines'
    );
  }

  calculateUnitPirceWithVat(i: number, value: any) {
    this.purchaseCalculationService.calculateUnitPirceWithVat(
      this.addForm,
      this.purchaseOrderLines,
      i,
      value
    );
  }

  calculateAmountWithVat(i: number, value: any) {
    this.purchaseCalculationService.calculateAmountWithPrice(
      this.addForm,
      this.purchaseOrderLines,
      i,
      value
    );
  }

  createFormArray() {
    this.addForm = this.fromBuilder.group({
      purchaseOrderLines: this.fromBuilder.array([
        this.createFormGroupService.initPurchaseOrderLines(),
      ]),
    });
  }

  get purchaseOrderLines(): FormArray {
    return <FormArray>this.addForm.controls.purchaseOrderLines;
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

  laodAllForkJoin() {
    const vats$ = this.vatService.getAll();
    const products$ = this.productService.getAll();
    forkJoin(vats$, products$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.vats = response[0].data), (this.products = response[1].data);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreatePurchaseOrderComponent, {
      backdrop: 'static',
      keyboard: true,
    });
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (item) => (
        (this.purchaseOrderModel = item.purchaseOrderModel),
        (this.warehouseId = item.warehouseId)
      ),
      (err) => console.log(err),
      () => console.log('Completed')
    );
  }

  onAdd() {
    // this.isValidFormSubmitted = false;
    // if (this.addForm.invalid) {
    //   return;
    // }
    // this.isValidFormSubmitted = true;
    this.purchaseOrderModel.purchaseOrderLines = Object.assign(
      {},
      this.addForm.value
    ).purchaseOrderLines;
    for (
      let i = 0;
      i < this.purchaseOrderModel.purchaseOrderLines.length;
      i++
    ) {
      this.purchaseOrderModel.purchaseOrderLines[i].warehouseId =
        this.warehouseId;
    }
    console.log(this.purchaseOrderModel);
    debugger;
    this.tallyInService
      .add(this.purchaseOrderModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          this.alertifyService.success(response.message);
        },
        (err) => {
          this.alertifyService.error(err);
        },
        () => {
          console.log('Islem Tamam'),
            this.router.navigateByUrl('purchaseorders');
        }
      );
  }
}
