import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account/account.model';
import { LedgerAccountModel } from 'src/app/core/models/ledger-entry/ledger-account-model.model';
import { LedgerEntry } from 'src/app/core/models/ledger-entry/ledger-entry.model';
import { Ledger } from 'src/app/core/models/ledger.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { AccountService } from 'src/app/core/services/api-services/account/account.service';
import { LedgerEntryService } from 'src/app/core/services/api-services/ledger-entry/ledger-entry.service';
import { LedgerService } from 'src/app/core/services/api-services/ledger/ledger.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  // ledger: Ledger = new Ledger();
  // ledgerEntriesData: LedgerEntry[] = [];
  accounts: Account[] = [];
  updateForm: FormGroup = new FormGroup({});
  ledgerAccountModel: LedgerAccountModel = new LedgerAccountModel();
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private ledgerEntryService: LedgerEntryService,
    private ledgerService: LedgerService,
    private accountService: AccountService,
    private fromBuilder: FormBuilder,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    // this.createFormArray();
    this.createFormArrayHundred();
    this.activatedRoute.params.subscribe((params) => {
      this.load(params['id']), console.log(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  load(id: number) {
    const ledger$ = this.ledgerService.getById(id);
    const ledgerEntries$ =
      this.ledgerEntryService.getByLedgerIdListLedgerEntries(id);
    const accounts$ = this.accountService.getAll();
    forkJoin(ledger$, ledgerEntries$, accounts$).subscribe((response) => {
      (response[0].data.registerDate = response[0].data.registerDate.slice(
        0,
        10
      )),
        this.updateForm.get('ledger')?.patchValue(response[0].data),
        this.loopAddFormArray(response[1].data.length),
        this.updateForm.get('ledgerEntries')?.patchValue(response[1].data),
        (this.accounts = response[2].data);
    });
  }

  createFormGroup() {
    this.updateForm = this.fromBuilder.group({
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
    return <FormArray>this.updateForm.controls.ledgerEntries;
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

  loopAddFormArray(value: number) {
    for (let i = 1; i < value; i++) {
      this.ledgerEntries.push(this.createFormArray());
    }
  }

  onUpdate() {
    this.ledgerAccountModel = Object.assign({}, this.updateForm.value);
    this.ledgerEntryService
      .bulkAdd(this.ledgerAccountModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.alertifyService.success(response.message),
        (err) => console.error(`${err}`),
        () => console.log('Tamamlandi.')
      );
  }
}
