import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnitOfMeasure } from 'src/app/core/models/unit-of-measure.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { UnitOfMeasureService } from 'src/app/core/services/api-services/unit-of-measure/unit-of-measure.service';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

@Component({
  selector: 'app-unitofmeasure',
  templateUrl: './unitofmeasure.component.html',
  styleUrls: ['./unitofmeasure.component.css'],
})
export class UnitofmeasureComponent implements OnInit, OnDestroy {
  unitOfMeasures: UnitOfMeasure[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private seewtalertService: SweetalertService,
    private unitOfMeasureService: UnitOfMeasureService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.unitOfMeasureService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.unitOfMeasures = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  trackByFn = (index: number, unitOfMeasure: UnitOfMeasure): number =>
    unitOfMeasure.id;

  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.unitOfMeasureService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => this.alertifyService.success(response.message),
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
