import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';
import { Product } from 'src/app/core/models/product/product.model';
import { Vat } from 'src/app/core/models/vat.model';
import { WholeSaleOrderModel } from 'src/app/core/models/whole-sale-order/whole-sale-order-model.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { LedgerService } from 'src/app/core/services/api-services/ledger/ledger.service';
import { ProductService } from 'src/app/core/services/api-services/product/product.service';
import { TallyOutService } from 'src/app/core/services/api-services/tally-out/tally-out.service';
import { VatService } from 'src/app/core/services/api-services/vat/vat.service';
import { WholeSaleOrderLineService } from 'src/app/core/services/api-services/whole-sale-order-line/whole-sale-order-line.service';
import { ReactiveFormCalculationService } from 'src/app/core/services/calculation/reactive-form-calculation.service';
import { WholeSaleCalculationService } from '../../../services/whole-sale-calculation.service';
import { WholeSaleCreateFormGroupService } from '../../../services/whole-sale-create-form-group.service';
import { UpdateWholeSaleOrderComponent } from '../update-whole-sale-order/update-whole-sale-order.component';

@Component({
  selector: 'app-update-whole-sale-order-line',
  templateUrl: './update-whole-sale-order-line.component.html',
  styleUrls: ['./update-whole-sale-order-line.component.css'],
})
export class UpdateWholeSaleOrderLineComponent implements OnInit, OnDestroy {
  wholeSaleOrderModel: WholeSaleOrderModel = new WholeSaleOrderModel();
  updateForm: FormGroup = new FormGroup({});
  products: Product[] = [];
  vats: Vat[] = [];
  warehouseId: number = 0;
  sumTotals: number[] = [];
  private ngUnsubcribe = new Subject<void>();
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reactiveFormCalculationService: ReactiveFormCalculationService,
    private ledgerSerice: LedgerService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
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
      this.ledgerSerice
        .getLedgerWithWholeSale(params['id'])
        .subscribe((response: SingleResponseModel<WholeSaleOrderModel>) => {
          this.wholeSaleOrderModel = response.data;
          this.warehouseId = response.data.wholeSaleOrderLines[0].warehouseId;
          this.loopAddFormArray(response.data.wholeSaleOrderLines.length);
          this.updateForm
            .get('wholeSaleOrderLines')
            ?.patchValue(response.data.wholeSaleOrderLines);
          this.openCreateModal();
        });
    });
  }

  calculate() {
    this.sumTotals = this.reactiveFormCalculationService.sumTotal(
      this.updateForm,
      'wholeSaleOrderLines'
    );
  }

  loadAllForkJoin() {
    const products$ = this.productService.getAll();
    const vats$ = this.vatService.getAll();
    forkJoin(products$, vats$)
      .pipe(takeUntil(this.ngUnsubcribe))
      .subscribe((response) => {
        (this.products = response[0].data), (this.vats = response[1].data);
      });
  }

  getProductId(i: number) {
    const productId = this.updateForm.value.wholeSaleOrderLines[i].productId;
    this.productService
      .getById(productId)
      .pipe(takeUntil(this.ngUnsubcribe))
      .subscribe((response) =>
        this.wholeSaleOrderLines
          .at(i)
          .get('vatId')
          ?.setValue(response.data.vatId)
      );
  }

  calculateUnitPirceWithVat(i: number, value: any) {
    this.wholeSaleCalculationService.calculateUnitPirceWithVat(
      this.updateForm,
      this.wholeSaleOrderLines,
      i,
      value
    );
  }

  calculateAmountWithVat(i: number, value: any) {
    this.wholeSaleCalculationService.calculateAmountWithPrice(
      this.updateForm,
      this.wholeSaleOrderLines,
      i,
      value
    );
  }

  createFormArray() {
    this.updateForm = this.fromBuilder.group({
      wholeSaleOrderLines: this.fromBuilder.array([
        this.wholeSaleCreateFormGroupService.initWholeSaleOrderLines(),
      ]),
    });
  }

  get wholeSaleOrderLines(): FormArray {
    return <FormArray>this.updateForm.controls.wholeSaleOrderLines;
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
    const modalRef = this.modalService.open(UpdateWholeSaleOrderComponent, {
      backdrop: 'static',
      keyboard: true,
    });
    modalRef.componentInstance.ledgerWithWholeSale = {
      ledger: this.wholeSaleOrderModel.ledger,
      wholeSaleOrder: this.wholeSaleOrderModel.wholeSaleOrder,
      warehouseId: this.warehouseId,
    };
    modalRef.closed.subscribe((response) => {
      (this.wholeSaleOrderModel.ledger = response.ledger),
        (this.wholeSaleOrderModel.wholeSaleOrder = response.wholeSaleOrder),
        (this.warehouseId = response.warehouseId);
    });
  }

  loopAddFormArray(value: number) {
    for (let i = 1; i < value; i++) {
      this.addWholeSaleOrderLinesFormArray();
    }
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
    if (this.updateForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.wholeSaleOrderModel.wholeSaleOrderLines = Object.assign(
      {},
      this.updateForm.value
    ).wholeSaleOrderLines;
    for (
      let i = 0;
      i < this.wholeSaleOrderModel.wholeSaleOrderLines.length;
      i++
    ) {
      this.wholeSaleOrderModel.wholeSaleOrderLines[i].warehouseId =
        this.warehouseId;
    }
    this.tallyOutService
      .update(this.wholeSaleOrderModel)
      .pipe(takeUntil(this.ngUnsubcribe))
      .subscribe(
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
