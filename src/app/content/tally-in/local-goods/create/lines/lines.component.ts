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
import { PurchaseOrderLinesCalculationNetService } from 'src/app/core/services/calculation/purchase-order-lines/purchase-order-lines-calculation-net.service';
import { InitFormPurchaseOrderLinesService } from 'src/app/core/services/initial-form-services/tally-in-services/initi-form-purchase-order-lines.service';
import { HeadComponent } from '../head/head.component';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css'],
})
export class LinesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  currencyRate: number = 1;
  addForm: FormGroup = new FormGroup({});
  products: Product[] = [];
  vats: Vat[] = [];
  purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
  warehouseId: number = 0;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private vatService: VatService,
    private alertifyService: AlertifyService,
    private router: Router,
    private tallyInService: TallyInService,
    private initFormPurchaseOrderLinesService: InitFormPurchaseOrderLinesService,
    private purchaseOrderLinesCalculationNetService: PurchaseOrderLinesCalculationNetService
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.laodAllForkJoin();
    this.createFormArray();
    this.createFormArrayHundred();
    this.openCreateModal();
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
            ?.patchValue(response.data.vatId)//,
          // this.purchaseOrderLines
          //   .at(i)
          //   .get('unitPriceWithVat')
          //   ?.patchValue(response.data.defaultBuyingPrice);
          //Fiyati Gostermek icin sonra yaparim diye
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Basarili')
      );
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

  createFormArray() {
    this.addForm = this.formBuilder.group({
      purchaseOrderLines: this.formBuilder.array([
        this.initFormPurchaseOrderLinesService.initPurchaseOrderLines(),
      ]),
    });
  }

  get purchaseOrderLines(): FormArray {
    return <FormArray>this.addForm.controls.purchaseOrderLines;
  }

  addPurchaseOrderLinesFormArray() {
    this.purchaseOrderLines.push(
      this.initFormPurchaseOrderLinesService.initPurchaseOrderLines()
    );
  }

  removePurchaseOrderLinesFormArray(i: number) {
    this.purchaseOrderLines.removeAt(i);
  }

  createFormArrayHundred() {
    for (let i = 0; i < 50; i++) {
      this.purchaseOrderLines.push(
        this.initFormPurchaseOrderLinesService.initPurchaseOrderLines()
      );
    }
  }

  calculate(i: number, value: any) {
    this.purchaseOrderLinesCalculationNetService.calculateUnitPrice(this.addForm, this.purchaseOrderLines, i, value, this.currencyRate);
  }

  amountToUnitPrice(amount: any, i: number) {
    debugger
    amount = Number(amount)
    let quantity = Number(this.addForm.value.purchaseOrderLines[i].quantity);
    let unitPrice = amount / quantity
    this.purchaseOrderLines.at(i).get('unitPrice')?.patchValue(unitPrice)
    this.calculate(i, unitPrice)
  }

  openCreateModal() {
    const modalRef = this.modalService.open(HeadComponent, {
      backdrop: 'static',
      keyboard: true,
    });
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (item) => (
        (this.purchaseOrderModel = item.purchaseOrderModel),
        (this.warehouseId = item.warehouseId),
        (this.currencyRate = item.purchaseOrderModel.purchaseOrder.currencyRate)
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
            this.router.navigateByUrl('tallyins');
        }
      );
  }
}
