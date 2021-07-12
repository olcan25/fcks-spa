import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Bank } from 'src/app/core/models/bank.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { BankService } from 'src/app/core/services/api-services/bank/bank.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  bank: Bank = new Bank();
  addForm: FormGroup = new FormGroup({});
  isValidFormSubmitted:boolean = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private bankService: BankService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
      id: [0],
      name: ['',[Validators.required,Validators.minLength(3)]],
      shortName: ['',[Validators.required,Validators.maxLength(5)]],
    });
  }

  get getControl(){
    return this.addForm.controls;
  }

  onAdd() {
    this.isValidFormSubmitted = false;
		if (this.addForm.invalid) {
			return;
		}
    this.isValidFormSubmitted = true;
    this.bank = Object.assign({}, this.addForm.value);
    this.bankService
      .add(this.bank)
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
