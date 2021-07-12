import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Bank } from 'src/app/core/models/bank.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { BankService } from 'src/app/core/services/api-services/bank/bank.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id: any;
  bank: Bank = new Bank();
  updateForm: FormGroup = new FormGroup({});
  isValidFormSubmitted: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private bankService: BankService,
    private alertifyService: AlertifyService
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.updateFormGroup();
    this.load();
  }

  updateFormGroup() {
    this.updateForm = this.fromBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      shortName: ['', [Validators.required, Validators.maxLength(5)]],
    });
  }

  get getControl() {
    return this.updateForm.controls;
  }

  load() {
    this.bankService
      .getById(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.updateForm.patchValue(response.data),
        (error) => console.error(error)
      );
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
    if (this.updateForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.bank = Object.assign({}, this.updateForm.value);
    this.bank.id = this.id;
    this.bankService
      .update(this.bank)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (repsonse) => this.alertifyService.success(repsonse.message),
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
