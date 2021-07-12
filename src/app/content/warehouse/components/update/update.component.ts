import { Company } from 'src/app/core/models/company.model';
import { CompanyService } from 'src/app/core/services/api-services/company/company.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id: any;
  companies: Company[] = [];
  warehouse: Warehouse = new Warehouse();
  updateForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private alertifyService: AlertifyService,
    private companyService: CompanyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllCompanies();
    this.load();
    this.updateFormGroup();
  }

  updateFormGroup() {
    this.updateForm = this.fromBuilder.group({
      id: [0],
      companyId: [0, [Validators.min(1)]],
      name: ['', [Validators.required, Validators.maxLength(40)]],
      country: ['', [Validators.required, Validators.maxLength(250)]],
      city: ['', [Validators.required]],
      addressDetail: ['', [Validators.required, Validators.maxLength(250)]],
      zipCode: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
    });
  }

  load() {
    this.warehouseService
      .getById(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.updateForm.patchValue(response.data),
        (error) => console.error(error)
      );
  }

  loadAllCompanies() {
    this.companyService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.companies = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  get getControl() {
    return this.updateForm.controls;
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
    if (this.updateForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.warehouse = Object.assign({}, this.updateForm.value);
    this.warehouse.id = this.id;
    this.warehouseService
      .update(this.warehouse)
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
