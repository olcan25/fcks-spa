import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Company } from 'src/app/core/models/company.model';
import { CompanyModel } from 'src/app/core/models/company/company-model.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { CompanyService } from 'src/app/core/services/api-services/company/company.service';
import {
  ValidateUIDNumber,
  ValidateVatNumber,
} from 'src/app/core/reactive-form-custom-validation/company-partner.validation';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  company: Company = new Company();
  companyModel: CompanyModel = new CompanyModel();
  addForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private companyService: CompanyService,
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
      name: ['', [Validators.required, Validators.maxLength(500)]],
      vatNumber: [
        '',
        [Validators.required, Validators.maxLength(9), ValidateVatNumber],
      ],
      uniqueIdentificationNumber: [
        '',
        [Validators.required, Validators.maxLength(9), ValidateUIDNumber],
      ],
      period: ['', [Validators.required,Validators.maxLength(4)]],
      file: [''],
    });
  }

  get getControl() {
    return this.addForm.controls;
  }

  formData: FormData = new FormData();
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.addForm.get('file')?.patchValue(file);
  }

  onAdd() {
    this.isValidFormSubmitted = false;
		if (this.addForm.invalid) {
			return;
		}
    this.isValidFormSubmitted = true;
    const formData = new FormData();
    formData.append('file', this.addForm.get('file')?.value);
    formData.append('name', this.addForm.get('name')?.value);
    formData.append('vatNumber', this.addForm.get('vatNumber')?.value);
    formData.append(
      'uniqueIdentificationNumber',
      this.addForm.get('uniqueIdentificationNumber')?.value
    );
    formData.append('period', this.addForm.get('period')?.value);
    formData.append('id', this.addForm.get('id')?.value);
    formData.append('file', this.addForm.get('file')?.value);
    this.companyService
      .addImage(formData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          this.alertifyService.success(response.message);
        },
        (err) => this.closeModal(),
        () => this.closeModal()
      );
  }

  closeModal() {
    this.activeModal.close();
  }

  dismissModal() {
    this.alertifyService.warning('Islem Iptal Edildi...');
    this.activeModal.dismiss();
  }
}
