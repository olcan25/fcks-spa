import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { ProductModel } from 'src/app/core/models/product/product-model.model';
import { ProductType } from 'src/app/core/models/product/product-type.mode';
import { Product } from 'src/app/core/models/product/product.model';
import { UnitOfMeasure } from 'src/app/core/models/unit-of-measure.model';
import { Vat } from 'src/app/core/models/vat.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { CategoryService } from 'src/app/core/services/api-services/category/category.service';
import { ProductTypeService } from 'src/app/core/services/api-services/product/product-type.service';
import { ProductService } from 'src/app/core/services/api-services/product/product.service';
import { UnitOfMeasureService } from 'src/app/core/services/api-services/unit-of-measure/unit-of-measure.service';
import { VatService } from 'src/app/core/services/api-services/vat/vat.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id!: number;
  productModel: ProductModel = new ProductModel();
  productTypes: ProductType[] = [];
  updateForm: FormGroup = new FormGroup({});
  vats: Vat[] = [];
  unitOfMeasures: UnitOfMeasure[] = [];
  categories: Category[] = [];
  isValidFormSubmitted: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private productService: ProductService,
    private vatService: VatService,
    private categoryService: CategoryService,
    private unitOfMeasureService: UnitOfMeasureService,
    private alertifyService: AlertifyService,
    private productTypeService: ProductTypeService
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
    const vats$ = this.vatService.getAll();
    const unitOfMeasures$ = this.unitOfMeasureService.getAll();
    const categories$ = this.categoryService.getAll();
    const productTypes$ = this.productTypeService.getAll();
    forkJoin(vats$, unitOfMeasures$, categories$, productTypes$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        (this.vats = response[0].data),
          (this.unitOfMeasures = response[1].data),
          (this.categories = response[2].data),
          (this.productTypes = response[3].data);
      });
  }

  load() {
    forkJoin(
      this.productService.getById(this.id),
      this.productService.getByIdBarcodes(this.id)
    ).subscribe((response) => {
      this.updateForm.get('product')?.patchValue(response[0].data),
        (this.loopAddFormArray(response[1].data.length),
        this.updateForm.get('productBarcodes')?.patchValue(response[1].data));
    });
  }

  updateFormGroup() {
    this.updateForm = this.fromBuilder.group({
      product: this.fromBuilder.group({
        id: [0],
        name: ['', [Validators.required, Validators.maxLength(250)]],
        categoryId: [0],
        vatId: [0, [Validators.min(1)]],
        unitOfMeasureId: [0, [Validators.min(1)]],
        productTypeId: [{ value: 1, disabled: true }, [Validators.min(1)]],
        imagePath: [''],
        description: [''],
        defaultBuyingPrice: [0],
        defaultSellingPrice: [0],
      }),
      productBarcodes: this.fromBuilder.array([
        this.createFormGroupProductBarcode(),
      ]),
    });
  }

  createFormGroupProductBarcode(): FormGroup {
    return this.fromBuilder.group({
      id: [0],
      barcode: ['', [Validators.required, Validators.maxLength(20)]],
      description: [''],
    });
  }

  loopAddFormArray(value: number) {
    for (let i = 1; i < value; i++) {
      this.addProductBarcodeFormArray();
    }
  }

  get getControlProduct() {
    return this.updateForm.get('product');
  }

  get productBarcodes(): FormArray {
    return <FormArray>this.updateForm.controls.productBarcodes;
  }

  addProductBarcodeFormArray() {
    this.productBarcodes.push(this.createFormGroupProductBarcode());
  }

  removeProductBarcodesFormArray(i: number) {
    this.productBarcodes.removeAt(i);
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
    if (this.updateForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.productModel = Object.assign({}, this.updateForm.value);
    this.productModel.product.id = this.id;
    this.productService
      .updateProductModel(this.productModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (item) => item,
        (err) => this.alertifyService.error(`${err}`),
        () => this.alertifyService.success(`Islem Onaylandi.`)
      );
    this.closeModal();
  }

  closeModal() {
    this.activeModal.close();
  }

  dismissModal() {
    this.alertifyService.warning('Islem Iptal Edildi...');
    this.activeModal.dismiss();
  }
}
