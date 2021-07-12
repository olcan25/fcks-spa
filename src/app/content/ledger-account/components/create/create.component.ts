import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account/account.model';
import { LedgerAccountModel } from 'src/app/core/models/ledger-entry/ledger-account-model.model';
import { LedgerEntry } from 'src/app/core/models/ledger-entry/ledger-entry.model';
import { Ledger } from 'src/app/core/models/ledger.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { AccountService } from 'src/app/core/services/api-services/account/account.service';
import { LedgerEntryService } from 'src/app/core/services/api-services/ledger-entry/ledger-entry.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  ledger: Ledger = new Ledger();
  accounts: Account[] = [];
  addForm: FormGroup = new FormGroup({});
  ledgerAccountModel: LedgerAccountModel = new LedgerAccountModel();
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fromBuilder: FormBuilder,
    private accountService: AccountService,
    private ledgerEntryService: LedgerEntryService,
    private alertifyService: AlertifyService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.createFormArrayHundred();
    this.loadAllAccounts();
  }

  loadAllAccounts() {
    this.accountService
      .getAll()
      .subscribe((response) => (this.accounts = response.data));
  }

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
      ledger: this.fromBuilder.group({
        id: [0],
        registerDate: [
          formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
          [Validators.required],
        ],
        description: [''],
      }),
      ledgerEntries: this.fromBuilder.array([this.createFormArray()]),
    });
  }

  get ledgerEntries(): FormArray {
    return <FormArray>this.addForm.controls.ledgerEntries;
  }

  addLedgerEntriesFormArray() {
    this.ledgerEntries.push(this.createFormArray());
  }

  removeLedgerEntriesormArray(i: number) {
    this.ledgerEntries.removeAt(i);
  }

  createFormArray(): FormGroup {
    return this.fromBuilder.group({
      id: [0],
      ledgerId: [0],
      accountId: [''],
      description: [''],
      note: [''],
      debt: [0],
      credit: [0],
    });
  }

  createFormArrayHundred() {
    for (let i = 0; i < 25; i++) {
      this.ledgerEntries.push(this.createFormArray());
    }
  }
  onAdd() {
    this.ledgerAccountModel = Object.assign({}, this.addForm.value);
    this.ledgerEntryService
      .bulkAdd(this.ledgerAccountModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.alertifyService.success(response.message),
        (err) => console.error(`${err}`),
        () => console.log('Tamamlandi.')
      );
    this.ngOnInit();
  }
}
