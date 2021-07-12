import { DtoWarehouse } from './../../core/models/warehouse/dto-warehouse.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent implements OnInit, OnDestroy {
  dtoWarehouses: DtoWarehouse[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private seewtalertService: SweetalertService,
    private warehouseService: WarehouseService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.warehouseService
      .getAllDtoWarehouses()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.dtoWarehouses = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Tamam')
      );
  }

  trackByFn = (index: number, warehosue: DtoWarehouse): number => warehosue.id;

  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.warehouseService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => this.alertifyService.error(response.message),
          (err) => this.alertifyService.error(err),
          () => this.loadAll()
        )
    );
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => console.log('Islem Gerceklesti'),
      (err) => console.log(err),
      () => this.loadAll()
    );
  }

  openUpdateModal(id: number) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.id = id;
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => console.log('Islem Gerceklesti'),
      (err) => console.log(err),
      () => this.loadAll()
    );
  }
}
