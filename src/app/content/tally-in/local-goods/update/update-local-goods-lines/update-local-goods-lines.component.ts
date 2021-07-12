import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product/product.model';
import { PurchaseOrderModel } from 'src/app/core/models/purchase-order/purchase-order-model.model';
import { Vat } from 'src/app/core/models/vat.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { LedgerService } from 'src/app/core/services/api-services/ledger/ledger.service';
import { ProductService } from 'src/app/core/services/api-services/product/product.service';
import { TallyInService } from 'src/app/core/services/api-services/tally-in/tally-in.service';
import { VatService } from 'src/app/core/services/api-services/vat/vat.service';
import { PurchaseOrderLinesCalculationNetService } from 'src/app/core/services/calculation/purchase-order-lines/purchase-order-lines-calculation-net.service';
import { InitFormPurchaseOrderLinesService } from 'src/app/core/services/initial-form-services/tally-in-services/initi-form-purchase-order-lines.service';
import { UpdateLocalGoodsHeadComponent } from '../update-local-goods-head/update-local-goods-head.component';

@Component({
  selector: 'app-update-local-goods-lines',
  templateUrl: './update-local-goods-lines.component.html',
  styleUrls: ['./update-local-goods-lines.component.css']
})
export class UpdateLocalGoodsLinesComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  ledgerId: number = 0;
  updateForm: FormGroup = new FormGroup({});
  purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
  products: Product[] = [];
  vats: Vat[] = []
  warehouseId: number = 0;
  currencyRate: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private vatService: VatService,
    private alertifyService: AlertifyService,
    private ledgerService: LedgerService,
    private tallyInService: TallyInService,
    private initFormPurchaseOrderLinesService: InitFormPurchaseOrderLinesService,
    private purchaseOrderLinesCalculationNetService: PurchaseOrderLinesCalculationNetService
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.load();
    this.loadAllForkJoin()
    this.createFormArray();
    this.createFormArrayHundred();
  }

  calculate(i: number, value: any) {
    this.purchaseOrderLinesCalculationNetService.calculateUnitPrice(this.updateForm, this.purchaseOrderLines, i, value, this.currencyRate);
  }

  amountToUnitPrice(amount: any, i: number) {
    debugger
    amount = Number(amount)
    let quantity = Number(this.updateForm.value.purchaseOrderLines[i].quantity);
    let unitPrice = amount / quantity
    this.purchaseOrderLines.at(i).get('unitPrice')?.patchValue(unitPrice)
    this.calculate(i, unitPrice)
  }

  getProductId(i: number) {
    const productId = this.updateForm.value.purchaseOrderLines[i].productId;
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

  load() {
    this.activatedRoute.params.subscribe(params => {
      this.ledgerService.getLedgerWithPurchase(params['id']).subscribe(response => {
        this.purchaseOrderModel = response.data,
          this.loopAddFormArray(response.data.purchaseOrderLines.length),
          this.updateForm.get('purchaseOrderLines')?.patchValue(response.data.purchaseOrderLines),
          this.openCreateModal()
      })
    })
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

  createFormArray() {
    this.updateForm = this.formBuilder.group({
      purchaseOrderLines: this.formBuilder.array([
        this.initFormPurchaseOrderLinesService.initPurchaseOrderLines(),
      ]),
    });
  }

  get purchaseOrderLines(): FormArray {
    return <FormArray>this.updateForm.controls.purchaseOrderLines;
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
  loopAddFormArray(value: number) {
    for (let i = 1; i < value; i++) {
      this.addPurchaseOrderLinesFormArray();
    }
  }

  openCreateModal() {
    const modalRef = this.modalService.open(UpdateLocalGoodsHeadComponent, {
      backdrop: 'static',
      keyboard: true,
    });
    modalRef.componentInstance.ledgerWithPurchase =
    {
      ledger: this.purchaseOrderModel.ledger,
      purchaseOrder: this.purchaseOrderModel.purchaseOrder,
      warehouseId: this.purchaseOrderModel.purchaseOrderLines[0].warehouseId,
    };
    modalRef.closed.subscribe((response) => {
      (this.purchaseOrderModel.ledger = response.ledger),
        (this.purchaseOrderModel.purchaseOrder = response.purchaseOrder),
        (this.warehouseId = response.warehouseId);
    });
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
    debugger
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
            this.router.navigateByUrl('tallyins');
        }
      );
  }
}
