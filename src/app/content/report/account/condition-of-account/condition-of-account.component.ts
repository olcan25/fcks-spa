import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DtoConditionOfAccount } from 'src/app/core/models/account/condition-of-account.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { ReportService } from 'src/app/core/services/api-services/report/report.service';

@Component({
  selector: 'app-condition-of-account',
  templateUrl: './condition-of-account.component.html',
  styleUrls: ['./condition-of-account.component.css'],
})
export class ConditionOfAccountComponent implements OnInit, OnDestroy {
  conditionOfAccounts: DtoConditionOfAccount[] = [];
  cols: any[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private reportService: ReportService,
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
    this.reportService
      .getAllConditionOfAccounts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.conditionOfAccounts = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
    this.cols = [
      { field: 'accountId' },
      { field: 'accountName' },
      { field: 'sumDebt' },
      { field: 'sumCredit' },
      { field: 'balance' },
    ];
  }

  loadAllBetweenDate(starDate: any, endDate: any) {
    this.reportService
      .getAllConditionOfAccountsBetweenDate(starDate, endDate)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.conditionOfAccounts = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  trackByFn = (
    index: string,
    conditionOfAccount: DtoConditionOfAccount
  ): string => conditionOfAccount.accountId;

  clear(table: Table) {
    table.clear();
  }
}
