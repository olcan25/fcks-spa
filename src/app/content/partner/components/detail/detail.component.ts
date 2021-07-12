import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Partner } from 'src/app/core/models/partner.model';
import { PartnerType } from 'src/app/core/models/partner/partner-type.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { PartnerTypeService } from 'src/app/core/services/api-services/partner/partner-type.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input() public id: any;
  partner: Partner = new Partner();
  partnerTypes: PartnerType[] = [];
  detailForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private partnerService: PartnerService,
    private partnerTypeService: PartnerTypeService,
    private alertifyService: AlertifyService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAllPartnerTypes();
    this.detailFormGroup();
    this.load();
  }
  loadAllPartnerTypes() {
    this.partnerTypeService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.partnerTypes = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  detailFormGroup() {
    this.detailForm = this.fromBuilder.group({
      id: [{ value: 0, disabled: true }],
      partnerTypeId: [{ value: 0, disabled: true }],
      name: [{ value: '', disabled: true }],
      vatNumber: [{ value: '', disabled: true }],
      uniqueIdentificationNumber: [{ value: '', disabled: true }],
      contactName: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      zipCode: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      fax: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      website: [{ value: '', disabled: true }],
      additionalInformation: [{ value: '', disabled: true }],
      logo: [{ value: '', disabled: true }],
    });
  }

  load() {
    this.partnerService
      .getById(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.detailForm.patchValue(response.data),
        (error) => this.alertifyService.error(error),
        () => console.log('Islem Tamam')
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
