import { CompanyService } from 'src/app/core/services/api-services/company/company.service';
import { Company } from 'src/app/core/models/company.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { WarehouseService } from 'src/app/core/services/api-services/warehouse/warehouse.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  warehouse: Warehouse = new Warehouse();
  companies: Company[] = [];
  addForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private companyService: CompanyService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllCompanies();
    this.createFormGroup();
  }

  loadAllCompanies() {
    this.companyService
      .getAll()
      .subscribe((response) => (this.companies = response.data));
  }

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
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

  get getControl() {
    return this.addForm.controls;
  }

  onAdd() {
    this.isValidFormSubmitted = false;
    if (this.addForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.warehouse = Object.assign({}, this.addForm.value);
    this.warehouseService
      .add(this.warehouse)
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
