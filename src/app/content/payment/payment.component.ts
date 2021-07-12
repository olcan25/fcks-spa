import { GetPaymentDto } from './../../core/models/payments/payment-dto.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { PaymentService } from 'src/app/core/services/api-services/payment/payment.service';
import { CreateComponent } from './components/create/create/create.component';
import { UpdateComponent } from './components/update/update/update.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  payments: GetPaymentDto[] = [];
  payment: GetPaymentDto = new GetPaymentDto();
  cols: any[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private paymentService: PaymentService,
    private seewtalertService: SweetalertService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'ledgerId', header: 'ID' },
      { field: 'registerDate', header: 'Kayit Tarihi' },
      { field: 'accountName', header: 'Hesap Ismi' },
      { field: 'partnerName', header: 'Partner Ismi' },
      { field: 'paymentType', header: 'Odeme Tipi' },
      { field: 'amount', header: 'Tutar' },
    ];
    this.loadAll();
  }

  loadAll() {
    this.paymentService
      .getAllPaymentDtoJoin()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.payments = response.data),
            this.payments.forEach(
              (payment) =>
                (payment.registerDate = new Date(payment.registerDate))
            );
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Is;em Tamam')
      );
  }

  trackByFn(index: number, payment: GetPaymentDto): number {
    return payment.id; // O index
  }
  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.paymentService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (item) => console.log(`Odeme Islemi Silindi`),
          (err) => console.error(`Delete Subscribe hatasi ${err}`),
          () => this.loadAll()
        )
    );
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (item) => item,
      (err) => console.log(err),
      () => this.loadAll()
    );
  }

  openUpdateModal(id: number) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.id = id;
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (item) => item,
      (err) => console.log(err),
      () => this.loadAll()
    );
  }

  clear(table: Table) {
    table.clear();
  }
}
