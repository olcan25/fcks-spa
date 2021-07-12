import { AccountService } from './../../../../../core/services/api-services/account/account.service';
import { formatDate } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';
import { forkJoin, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account/account.model';
import { Partner } from 'src/app/core/models/partner.model';
import { PaymentModel } from 'src/app/core/models/payments/payment-model.model';
import { PaymentType } from 'src/app/core/models/payments/payment-type.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { LedgerService } from 'src/app/core/services/api-services/ledger/ledger.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { PaymentTypeService } from 'src/app/core/services/api-services/payment/payment-type.service';
import { PaymentService } from 'src/app/core/services/api-services/payment/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id: any;
  updateForm: FormGroup = new FormGroup({});
  paymentModel: PaymentModel = new PaymentModel();
  partners: Partner[] = [];
  accounts: Account[] = [];
  paymentTypes: PaymentType[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private config: NgSelectConfig,
    private paymentService: PaymentService,
    private alertifyService: AlertifyService,
    private partnerService: PartnerService,
    private accountService: AccountService,
    private paymentTypeService: PaymentTypeService,
    private ledgerService: LedgerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateFormGroup();
    this.loadAllForkJoin();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadAllForkJoin() {
    const partners$ = this.partnerService.getAll();
    const accounts$ = this.accountService
      .getAll()
      .pipe(
        map((x) =>
          x.data.filter((x) => x.id.length > 3 && x.id.startsWith('10'))
        )
      );
    const paymentTypes$ = this.paymentTypeService.getAll();
    const ledger$ = this.ledgerService.getById(this.id);
    const payment$ = this.paymentService.getByLedgerIdPayment(this.id);
    forkJoin(partners$, accounts$, paymentTypes$, ledger$, payment$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        (this.partners = response[0].data),
          (this.accounts = response[1]),
          (this.paymentTypes = response[2].data),
          (response[3].data.registerDate = response[3].data.registerDate.slice(
            0,
            10
          )),
          this.updateForm.get('ledger')?.patchValue(response[3].data),
          this.updateForm.get('payment')?.patchValue(response[4].data);
      });
  }

  updateFormGroup() {
    this.updateForm = this.fromBuilder.group({
      ledger: this.fromBuilder.group({
        id: [0],
        registerDate: ['', Validators.required],
        description: [''],
      }),
      payment: this.fromBuilder.group({
        id: [0],
        ledgerId: [0],
        partnerId: [0, Validators.min(1)],
        accountId: [0, Validators.required],
        paymentTypeId: [0, Validators.min(1)],
        note: [''],
        description: [''],
        amount: [0, Validators.required],
      }),
    });
  }

  onUpdate() {
    this.paymentModel = Object.assign({}, this.updateForm.value);
    this.paymentService
      .update(this.paymentModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.alertifyService.success(response.message),
        (err) => this.alertifyService.error(`${err}`),
        () => console.log('Tamamlandi.')
      );
    this.closeModal();
  }

  closeModal() {
    this.activeModal.close(true);
  }

  dismissModal() {
    //this.router.navigateByUrl('purchaseorders');
    this.activeModal.dismiss();
  }
}
