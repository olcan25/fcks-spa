import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/core/models/country.model';
import { Partner } from 'src/app/core/models/partner.model';
import { PartnerType } from 'src/app/core/models/partner/partner-type.model';
import {
  ValidateVatNumber,
  ValidateUIDNumber,
} from 'src/app/core/reactive-form-custom-validation/company-partner.validation';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { PartnerTypeService } from 'src/app/core/services/api-services/partner/partner-type.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { CountryCityService } from 'src/app/core/services/geodb-services/country-city.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id!: number;
  countries: Country[] = [];
  partner: Partner = new Partner();
  updateForm: FormGroup = new FormGroup({});
  partnerTypes: PartnerType[] = [];
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private partnerService: PartnerService,
    private countryCityService: CountryCityService,
    private alertifyService: AlertifyService,
    private partnerTypeService: PartnerTypeService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllForkJoin();
    this.updateFormGroup();
    this.load();
  }

  loadAllForkJoin() {
    const countries$ = this.countryCityService.getAllCountries();
    const partnerTypes$ = this.partnerTypeService.getAll();
    forkJoin(countries$, partnerTypes$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.countries = response[0]),
            (this.partnerTypes = response[1].data);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  updateFormGroup() {
    this.updateForm = this.fromBuilder.group({
      id: [0],
      partnerTypeId: [0, [Validators.min(1)]],
      name: ['', [Validators.required, Validators.maxLength(250)]],
      vatNumber: [
        '',
        [Validators.minLength(9), Validators.maxLength(9), ValidateVatNumber],
      ],
      uniqueIdentificationNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          ValidateUIDNumber,
        ],
      ],
      contactName: ['', [Validators.minLength(3), Validators.maxLength(40)]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      zipCode: ['', [Validators.minLength(5), Validators.maxLength(5)]],
      phone: ['', [Validators.minLength(3), Validators.maxLength(25)]],
      fax: ['', [Validators.minLength(3), Validators.maxLength(25)]],
      email: [
        '',
        [Validators.maxLength(50), Validators.minLength(5), Validators.email],
      ],
      website: [''],
      additionalInformation: [
        '',
        [Validators.maxLength(9), Validators.minLength(9)],
      ],
      logo: [''],
    });
  }

  get getControl() {
    return this.updateForm.controls;
  }

  load() {
    this.partnerService.getById(this.id).subscribe(
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
    this.partner = Object.assign({}, this.updateForm.value);
    this.partner.id = this.id;
    this.partnerService.update(this.partner).subscribe(
      (response) => this.alertifyService.success(response.message),
      (err) => this.alertifyService.error(`${err}`),
      () => console.log('Tamamlandi.')
    );
    this.closeModal();
  }

  closeModal() {
    this.activeModal.close();
  }

  // tslint:disable-next-line:typedef
  dismissModal() {
    this.alertifyService.warning('Islem Iptal Edildi...');
    this.activeModal.dismiss();
  }
}
