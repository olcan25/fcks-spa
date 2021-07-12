import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetDtoPartnerBankAccount } from 'src/app/core/models/partner-bank-account/get-dto-partner-bank-account';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { PartnerBankAccountService } from 'src/app/core/services/api-services/partner-bank-account/partner-bank-account.service';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

@Component({
  selector: 'app-partner-bank-account',
  templateUrl: './partner-bank-account.component.html',
  styleUrls: ['./partner-bank-account.component.css'],
})
export class PartnerBankAccountComponent implements OnInit, OnDestroy {
  getDtoPartnerBankAccounts: GetDtoPartnerBankAccount[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private seewtalertService: SweetalertService,
    private partnerBankAccountService: PartnerBankAccountService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.partnerBankAccountService
      .getAllDtoPartnerBankAccounts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          this.getDtoPartnerBankAccounts = response.data;
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  trackByFn(
    index: number,
    getDtoPartnerBankAccount: GetDtoPartnerBankAccount
  ): number {
    return getDtoPartnerBankAccount.id;
  }

  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.partnerBankAccountService
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
