import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Bank } from 'src/app/core/models/bank.model';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { BankService } from 'src/app/core/services/api-services/bank/bank.service';
import { OpenWeatherMapService } from 'src/app/core/services/api-services/weather/open-weather-map.service';
import { NgBootstrapModalService } from 'src/app/core/services/modal-services/ng-bootstrap-modal.service';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit, OnDestroy {
  banks: Bank[] = [];
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private modalService: NgbModal,
    private seewtalertService: SweetalertService,
    private bankService: BankService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.bankService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => (this.banks = response.data));
  }

  trackByFn(index: number, bank: Bank): number {
    return bank.id;
  }

  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.bankService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => console.log(`${response.message}`),
          (err) => this.alertifyService.error(err),
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
