import { Account } from 'src/app/core/models/account/account.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { AccountService } from 'src/app/core/services/api-services/account/account.service';
import { GetAccountDto } from 'src/app/core/models/account/account-dto.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { takeUntil } from 'rxjs/operators';
import { CreateComponent } from './components/create/create.component';
import { Subject } from 'rxjs';
import { UpdateComponent } from './components/update/update.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy {
  accounts: GetAccountDto[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private alertifyService: AlertifyService,
    private modalService: NgbModal,
    private seewtalertService: SweetalertService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.accountService.getAllListDtoAccounts().subscribe(
      (response) => (this.accounts = response.data),
      (error) => this.alertifyService.error(error),
      () => console.log('Islem Tamam')
    );
  }
  trackByFn(index: number, account: GetAccountDto): string {
    return account.id;
  }

  delete(id: string) {
    this.seewtalertService.confrim(() =>
      this.accountService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (item) => console.log(`${item.message}`),
          (err) => console.error(`${err}`),
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

  openUpdateModal(id: string) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.id = id;
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => console.log('Islem Tamam'),
      (err) => console.log(err),
      () => this.loadAll()
    );
  }
}
