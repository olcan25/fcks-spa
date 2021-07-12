import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { DtoProduct } from 'src/app/core/models/product/get-dto-product.model';
import { Product } from 'src/app/core/models/product/product.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { ProductService } from 'src/app/core/services/api-services/product/product.service';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  dtoProducts: DtoProduct[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private seewtalertService: SweetalertService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadAll() {
    this.productService
      .getAllDtoProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          this.dtoProducts = response.data;
        },
        (err) => this.alertifyService.error(`${err}`),
        () => console.log('Tamam')
      );
  }

  trackByFn(index: number, dtoProduct: DtoProduct): number {
    return dtoProduct.id;
  }

  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.productService
        .deleteProductModel(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (item) => console.log(item),
          (err) => console.error(err),
          () => this.loadAll()
        )
    );
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => console.log('Islem Tamam'),
      (err) => console.log(err),
      () => this.loadAll()
    );
  }

  openUpdateModal(id: number) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.id = id;
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => console.log('Islem Tamam'),
      (err) => console.log(err),
      () => this.loadAll()
    );
  }
}
