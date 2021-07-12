import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountType } from 'src/app/core/models/account/account-type.model';
import { Account } from 'src/app/core/models/account/account.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { AccountTypeService } from 'src/app/core/services/api-services/account-type/account-type.service';
import { AccountService } from 'src/app/core/services/api-services/account/account.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  @Input() public id: any;
  updateForm: FormGroup = new FormGroup({});
  account: Account = new Account();
  accountTypes: AccountType[] = [];
  isValidFormSubmitted: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private accountTypeService: AccountTypeService,
    private alertifyService: AlertifyService,
    private activeModal: NgbActiveModal
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getAllAccountTypes();
    this.updateFormGroup();
    this.load(this.id);
  }

  load(id: string) {
    this.accountService
      .getById(id)
      .subscribe((response) => this.updateForm.patchValue(response.data));
  }

  getAllAccountTypes() {
    this.accountTypeService
      .getAll()
      .subscribe((response) => (this.accountTypes = response.data));
  }

  updateFormGroup() {
    this.updateForm = this.formBuilder.group({
      id: [''],
      accountTypeId: [0],
      name: [''],
      description: [''],
    });
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
    if (this.updateForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.account = Object.assign({}, this.updateForm.value);
    this.accountService
      .update(this.account)
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
