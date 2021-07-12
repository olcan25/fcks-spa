import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompanyBankAccount } from 'src/app/core/models/company-bank-account/company-bank-account.model';
import { GetDtoCompanyBankAccount } from 'src/app/core/models/company-bank-account/getDtoCompanyBankAccount';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { CompanyBankAccountService } from 'src/app/core/services/api-services/company-bank-account/company-bank-account.service';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-company-bank-account',
  templateUrl: './company-bank-account.component.html',
  styleUrls: ['./company-bank-account.component.css'],
})
export class CompanyBankAccountComponent implements OnInit, OnDestroy {
  getDtoCompanyBankAccounts: GetDtoCompanyBankAccount[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private seewtalertService: SweetalertService,
    private companyBankAccountService: CompanyBankAccountService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.companyBankAccountService
      .getAllWithCompanyBank()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.getDtoCompanyBankAccounts = response.data),
        (error) => this.alertifyService.error(error),
        () => console.log('Islem amam')
      );
  }

  trackByFn(
    index: number,
    getDtoCompanyBankAccount: GetDtoCompanyBankAccount
  ): number {
    return getDtoCompanyBankAccount.id;
  }

  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.companyBankAccountService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => this.alertifyService.success(response.message),
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
