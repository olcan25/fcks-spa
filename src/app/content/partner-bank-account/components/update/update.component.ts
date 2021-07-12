import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Bank } from 'src/app/core/models/bank.model';
import { PartnerBankAccount } from 'src/app/core/models/partner-bank-account/partner-bank-account.model';
import { Partner } from 'src/app/core/models/partner.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { BankService } from 'src/app/core/services/api-services/bank/bank.service';
import { PartnerBankAccountService } from 'src/app/core/services/api-services/partner-bank-account/partner-bank-account.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id: any;
  partnerBankAccount: PartnerBankAccount = new PartnerBankAccount();
  banks: Bank[] = [];
  partners: Partner[] = [];
  updateForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private partnerBankAccountService: PartnerBankAccountService,
    private bankService: BankService,
    private partnerService: PartnerService,
    private alertifyService: AlertifyService,
    private config: NgSelectConfig
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.laodAllForkJoin();
    this.updateFormGroup();
    this.load();
  }

  laodAllForkJoin() {
    const partners$ = this.partnerService.getAll();
    const banks$ = this.bankService.getAll();
    forkJoin(partners$, banks$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.partners = response[0].data), (this.banks = response[1].data);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  load() {
    this.partnerBankAccountService
      .getById(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.updateForm.patchValue(response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  updateFormGroup() {
    this.updateForm = this.fromBuilder.group({
      id: [0],
      partnerId: [0,[Validators.min(1)]],
      bankId: [0,[Validators.min(1)]],
      accountNumber: ['',[Validators.required,Validators.minLength(12),Validators.maxLength(25)]],
      iban: ['',[Validators.maxLength(8)]],
      swiftCode: ['',[Validators.maxLength(12)]],
    });
  }

  get getControl(){
    return this.updateForm.controls
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
		if (this.updateForm.invalid) {
			return;
		}
    this.isValidFormSubmitted = true;
    this.partnerBankAccount = Object.assign({}, this.updateForm.value);
    this.partnerBankAccount.id = this.id;
    this.partnerBankAccountService
      .update(this.partnerBankAccount)
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
