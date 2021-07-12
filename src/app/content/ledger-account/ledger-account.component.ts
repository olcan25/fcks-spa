import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LedgerAccountDto } from 'src/app/core/models/ledger-entry/ledger-account.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { LedgerEntryService } from 'src/app/core/services/api-services/ledger-entry/ledger-entry.service';

@Component({
  selector: 'app-ledger-account',
  templateUrl: './ledger-account.component.html',
  styleUrls: ['./ledger-account.component.css'],
})
export class LedgerAccountComponent implements OnInit, OnDestroy {
  ledgerAccounts: LedgerAccountDto[] = [];
  private ngUnsubscribe = new Subject<void>();
  cols: any[] = [];

  constructor(
    private ledgerEntryService: LedgerEntryService,
    private sweetAlertService: SweetalertService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
    this.cols = [
      { field: 'ledgerId', header: 'ID' },
      { field: 'registerDate', header: 'Kayit Tarihi' },
      { field: 'ledgerDescription', header: 'Aciklama' },
      { field: 'debt', header: 'Borc' },
      { field: 'credit', header: 'Alacak' },
      { field: 'balance', header: 'Bakiye' },
    ];
  }

  loadAll() {
    this.ledgerEntryService
      .getAllLedgerAccountsDto()
      .subscribe((response) => (this.ledgerAccounts = response.data));
  }

  loadAllBetweenDate(starDate: any, endDate: any) {
    this.ledgerEntryService
      .getAllLedgerAccountsDtoBetweenDate(starDate, endDate)
      .subscribe((response) => (this.ledgerAccounts = response.data));
  }

  trackByFn(index: number, ledgerAccount: LedgerAccountDto): number {
    return ledgerAccount.ledgerId;
  }

  delete(id: number) {
    this.sweetAlertService.confrim(() =>
      this.ledgerEntryService
        .bulkDelete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => this.alertifyService.success(response.message),
          (err) => console.error(`${err}`),
          () => this.loadAll()
        )
    );
  }
  clear(table: Table) {
    table.clear();
  }
}
