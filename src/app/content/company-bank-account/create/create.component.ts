import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Bank } from 'src/app/core/models/bank.model';
import { CompanyBankAccount } from 'src/app/core/models/company-bank-account/company-bank-account.model';
import { Company } from 'src/app/core/models/company.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { BankService } from 'src/app/core/services/api-services/bank/bank.service';
import { CompanyBankAccountService } from 'src/app/core/services/api-services/company-bank-account/company-bank-account.service';
import { CompanyService } from 'src/app/core/services/api-services/company/company.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  companyBankAccount: CompanyBankAccount = new CompanyBankAccount();
  banks: Bank[] = [];
  companies: Company[] = [];
  addForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted:boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private companyBankAccountService: CompanyBankAccountService,
    private bankService: BankService,
    private companyService: CompanyService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllForkJoin();
    this.createFormGroup();
  }

  loadAllForkJoin() {
    const companies$ = this.companyService.getAll();
    const banks$ = this.bankService.getAll();
    forkJoin(banks$, companies$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.banks = response[0].data), (this.companies = response[1].data);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
      id: [0],
      companyId: [0,[Validators.min(1)]],
      bankId: [0,[Validators.min(1)]],
      accountNumber: ['',[Validators.required,Validators.minLength(12),Validators.maxLength(25)]],
      iban: ['',[Validators.maxLength(8)]],
      swiftCode: ['',[Validators.maxLength(12)]],
    });
  }

  get getControl(){
    return this.addForm.controls
  }

  onAdd() {
    this.isValidFormSubmitted = false;
		if (this.addForm.invalid) {
			return;
		}
    this.isValidFormSubmitted = true;
    this.companyBankAccount = Object.assign({}, this.addForm.value);
    this.companyBankAccountService
      .add(this.companyBankAccount)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.alertifyService.success(response.message),
        (err) => this.alertifyService.error(`${err}`),
        () => console.log('Tamamlandi.')
      );
    this.closeModal();
  }

  closeModal() {
    this.activeModal.close();
  }

  dismissModal() {
    this.alertifyService.warning('Islem Iptal Edildi...');
    this.activeModal.dismiss();
  }
}
