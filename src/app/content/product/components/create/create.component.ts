import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  productModel: ProductModel = new ProductModel();
  productTypes: ProductType[] = [];
  addForm: FormGroup = new FormGroup({});
  vats: Vat[] = [];
  unitOfMeasures: UnitOfMeasure[] = [];
  categories: Category[] = [];
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted: boolean = false;

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
  // keys: any = Object.keys(ProductType).filter(
  //   (k) => typeof ProductType[k as any] === 'number'
  // );
  // values: any = this.keys.map((k: any) => ProductType[k as any]);

  ngOnInit(): void {
    this.loadAllForkJoin();
    this.createFormGroup();
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

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
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

  get getControlProduct() {
    return this.addForm.get('product');
  }

  get productBarcodes(): FormArray {
    return <FormArray>this.addForm.controls.productBarcodes;
  }

  addProductBarcodeFormArray() {
    this.productBarcodes.push(this.createFormGroupProductBarcode());
  }

  removeProductBarcodesFormArray(i: number) {
    this.productBarcodes.removeAt(i);
  }

  onAdd() {
    console.log(this.getControlProduct);
    this.isValidFormSubmitted = false;
    if (this.addForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.productModel = Object.assign({}, this.addForm.value);
    this.productService
      .addProductModel(this.productModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.alertifyService.success(response.message),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
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
