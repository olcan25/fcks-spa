import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Company } from 'src/app/core/models/company.model';
import {
  ValidateUIDNumber,
  ValidateVatNumber,
} from 'src/app/core/reactive-form-custom-validation/company-partner.validation';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { CompanyService } from 'src/app/core/services/api-services/company/company.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id: any;
  company: Company = new Company();
  updateForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private companyService: CompanyService,
    private alertifyService: AlertifyService
  ) {}
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
      name: ['', [Validators.required, Validators.maxLength(500)]],
      vatNumber: [
        '',
        [Validators.required, Validators.maxLength(9), ValidateVatNumber],
      ],
      uniqueIdentificationNumber: [
        '',
        [Validators.required, Validators.maxLength(9), ValidateUIDNumber],
      ],
      period: ['', [Validators.required]],
      imageUrl: [{ value: null }],
      publicId: [{ value: null }],
    });
  }

  load() {
    this.companyService
      .getById(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.updateForm.patchValue(response.data),
        (error) => console.error(error),
        () => console.log('Islem Tamam')
      );
  }

  get getControl() {
    return this.updateForm.controls;
  }

  onUpdate() {
    this.company = Object.assign({}, this.updateForm.value);
    this.company.id = this.id;
    console.log(this.updateForm.value);
    this.companyService
      .update(this.company)
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
