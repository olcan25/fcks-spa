import { AccountService } from './../../../../../core/services/api-services/account/account.service';
import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';
import { forkJoin, Subject } from 'rxjs';
import { filter, takeUntil, map } from 'rxjs/operators';
import { Partner } from 'src/app/core/models/partner.model';
import { PaymentModel } from 'src/app/core/models/payments/payment-model.model';
import { PaymentType } from 'src/app/core/models/payments/payment-type.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { PaymentTypeService } from 'src/app/core/services/api-services/payment/payment-type.service';
import { PaymentService } from 'src/app/core/services/api-services/payment/payment.service';
import { Account } from 'src/app/core/models/account/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  addForm: FormGroup = new FormGroup({});
  paymentModel: PaymentModel = new PaymentModel();
  partners: Partner[] = [];
  accounts: Account[] = [];
  paymentTypes: PaymentType[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private paymentService: PaymentService,
    private alertifyService: AlertifyService,
    private partnerService: PartnerService,
    private accountService: AccountService,
    private paymentTypeService: PaymentTypeService,
    private router: Router
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
    const partners$ = this.partnerService.getAll();
    const accounts$ = this.accountService
      .getAll()
      .pipe(
        map((x) =>
          x.data.filter((x) => x.id.length > 3 && x.id.startsWith('10'))
        )
      );
    const payments$ = this.paymentTypeService.getAll();
    forkJoin(partners$, accounts$, payments$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.partners = response[0].data),
            (this.accounts = response[1]),
            (this.paymentTypes = response[2].data);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
      ledger: this.fromBuilder.group({
        id: [0],
        registerDate: [
          formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
          Validators.required,
        ],
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

  onAdd() {
    this.paymentModel = Object.assign({}, this.addForm.value);
    this.paymentService
      .add(this.paymentModel)
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
    this.activeModal.dismiss();
  }
}
