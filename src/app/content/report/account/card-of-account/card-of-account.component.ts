import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account/account.model';
import { DtoCardOfAccount } from 'src/app/core/models/account/card-of-account.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { AccountService } from 'src/app/core/services/api-services/account/account.service';
import { ReportService } from 'src/app/core/services/api-services/report/report.service';

@Component({
  selector: 'app-card-of-account',
  templateUrl: './card-of-account.component.html',
  styleUrls: ['./card-of-account.component.css'],
})
export class CardOfAccountComponent implements OnInit {
  cardOfAccounts: DtoCardOfAccount[] = [];
  balance: number[] = [];
  account: Account = new Account();
  cols: any[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService,
    private alertifyService: AlertifyService,
    private accountService: AccountService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (params) => {
        this.loadAll(params['id']), this.loadByAccountId(params['id']);
      },
      (err) => this.alertifyService.error(err),
      () => console.log('Islem Tamam')
    );
    this.cols = [
      { field: 'ledgerId' },
      { field: 'registerDate' },
      { field: 'partnerName' },
      { field: 'debt' },
      { field: 'credit' },
      { field: 'balance' },
    ];
  }

  loadAll(id: string) {
    this.reportService
      .getByAccountIdListCardOfAccounts(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.cardOfAccounts = response.data),
            (this.balance = response.data.map((x) => x.balance));
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  loadAllBetweenDate(starDate: any, endDate: any) {
    let accountId: string = '';
    this.activatedRoute.params.subscribe((params) => {
      accountId = params['id'];
    });
    this.reportService
      .getByAccountIdListCardOfAccountsPost(accountId, starDate, endDate)

      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.cardOfAccounts = response.data),
            (this.balance = response.data.map((x) => x.balance));
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  totalBalance(index: number): number {
    let value = 0;
    index = index + 1;

    for (let i = 0; i < index; i++) {
      value += this.balance[i];
    }
    return value;
  }

  loadByAccountId(accountId: string) {
    this.accountService.getById(accountId).subscribe(
      (response) => (this.account = response.data),
      (err) => console.error(err),
      () => console.log('Islem Tamam')
    );
  }

  trackByFn = (index: number, cardOfAccount: DtoCardOfAccount): number =>
    cardOfAccount.ledgerId;

  clear(table: Table) {
    table.clear();
  }
}
