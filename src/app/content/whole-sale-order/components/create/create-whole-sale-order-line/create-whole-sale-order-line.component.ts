import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product/product.model';
import { Vat } from 'src/app/core/models/vat.model';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { WholeSaleOrderModel } from 'src/app/core/models/whole-sale-order/whole-sale-order-model.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { ProductService } from 'src/app/core/services/api-services/product/product.service';
import { TallyOutService } from 'src/app/core/services/api-services/tally-out/tally-out.service';
import { VatService } from 'src/app/core/services/api-services/vat/vat.service';
import { ReactiveFormCalculationService } from 'src/app/core/services/calculation/reactive-form-calculation.service';
import { WholeSaleCalculationService } from '../../../services/whole-sale-calculation.service';
import { WholeSaleCreateFormGroupService } from '../../../services/whole-sale-create-form-group.service';
import { CreateWholeSaleOrderComponent } from '../create-whole-sale-order/create-whole-sale-order.component';

@Component({
  selector: 'app-whole-sale-order-line',
  templateUrl: './create-whole-sale-order-line.component.html',
  styleUrls: ['./create-whole-sale-order-line.component.css'],
})
export class CreateWholeSaleOrderLineComponent implements OnInit, OnDestroy {
  wholeSaleOrderModel: WholeSaleOrderModel = new WholeSaleOrderModel();
  addForm: FormGroup = new FormGroup({});
  products: Product[] = [];
  warehouses: Warehouse[] = [];
  vats: Vat[] = [];
  warehouseId: number = 0;
  sumArray: number[] = [];
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    private modalService: NgbModal,
    private fromBuilder: FormBuilder,
    private productService: ProductService,
    private vatService: VatService,
    private wholeSaleCreateFormGroupService: WholeSaleCreateFormGroupService,
    private wholeSaleCalculationService: WholeSaleCalculationService,
    private tallyOutService: TallyOutService,
    private alertifyService: AlertifyService,
    private router: Router,
    private reactiveFormCalculationService: ReactiveFormCalculationService
  ) {
    this.createFormArray();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.createFormArray();
    this.createFormArrayHundred();
    this.loadForkJoin();
    this.openCreateModal();
    this.calculate();
  }

  calculate() {
    this.sumArray = this.reactiveFormCalculationService.sumTotal(
      this.addForm,
      'wholeSaleOrderLines'
    );
  }

  loadForkJoin() {
    const products$ = this.productService.getAll();
    const vats$ = this.vatService.getAll();
    forkJoin(products$, vats$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.products = response[0].data), (this.vats = response[1].data);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islen Tamam')
      );
  }

  getProductId(i: number) {
    const productId = this.addForm.value.wholeSaleOrderLines[i].productId;
    this.productService
      .getById(productId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) =>
          this.wholeSaleOrderLines
            .at(i)
            .get('vatId')
            ?.patchValue(response.data.vatId),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  calculateUnitPirceWithVat(i: number, value: any) {
    this.wholeSaleCalculationService.calculateUnitPirceWithVat(
      this.addForm,
      this.wholeSaleOrderLines,
      i,
      value
    );
  }

  calculateAmountWithVat(i: number, value: any) {
    this.wholeSaleCalculationService.calculateAmountWithPrice(
      this.addForm,
      this.wholeSaleOrderLines,
      i,
      value
    );
  }

  createFormArray() {
    this.addForm = this.fromBuilder.group({
      wholeSaleOrderLines: this.fromBuilder.array([
        this.wholeSaleCreateFormGroupService.initWholeSaleOrderLines(),
      ]),
    });
  }

  get wholeSaleOrderLines(): FormArray {
    return <FormArray>this.addForm.controls.wholeSaleOrderLines;
  }

  addWholeSaleOrderLinesFormArray() {
    this.wholeSaleOrderLines.push(
      this.wholeSaleCreateFormGroupService.initWholeSaleOrderLines()
    );
  }

  removeWholeSaleOrderLinesFormArray(i: number) {
    this.wholeSaleOrderLines.removeAt(i);
  }

  createFormArrayHundred() {
    for (let i = 0; i < 50; i++) {
      this.wholeSaleOrderLines.push(
        this.wholeSaleCreateFormGroupService.initWholeSaleOrderLines()
      );
    }
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateWholeSaleOrderComponent, {
      backdrop: 'static',
      keyboard: true,
    });
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (item) => (
        (this.wholeSaleOrderModel = item.wholeSaleOrderModel),
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
    this.wholeSaleOrderModel.wholeSaleOrderLines = Object.assign(
      {},
      this.addForm.value
    ).wholeSaleOrderLines;
    for (
      let i = 0;
      i < this.wholeSaleOrderModel.wholeSaleOrderLines.length;
      i++
    ) {
      this.wholeSaleOrderModel.wholeSaleOrderLines[i].warehouseId =
        this.warehouseId;
    }
    this.tallyOutService.add(this.wholeSaleOrderModel).subscribe(
      (response) => {
        this.alertifyService.success(response.message);
      },
      (err) => {
        this.alertifyService.error(err);
      },
      () => {
        this.router.navigateByUrl('wholesaleorders');
      }
    );
  }
}
