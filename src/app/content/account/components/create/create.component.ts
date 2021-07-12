import { Component, OnInit } from '@angular/core';
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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  addForm: FormGroup = new FormGroup({});
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
    this.createFormGroup();
  }

  getAllAccountTypes() {
    this.accountTypeService
      .getAll()
      .subscribe((response) => (this.accountTypes = response.data));
  }

  createFormGroup() {
    this.addForm = this.formBuilder.group({
      id: [''],
      accountTypeId: [0],
      officalCode: [0],
      name: [''],
      description: [''],
    });
  }

  onAdd() {
    this.isValidFormSubmitted = false;
    if (this.addForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.account = Object.assign({}, this.addForm.value);
    this.accountService
      .add(this.account)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.alertifyService.success(response.message),
        (err) => console.error(err),
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
