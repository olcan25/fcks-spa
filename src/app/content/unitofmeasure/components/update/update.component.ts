import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnitOfMeasure } from 'src/app/core/models/unit-of-measure.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { UnitOfMeasureService } from 'src/app/core/services/api-services/unit-of-measure/unit-of-measure.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id!: number;
  unitOfMeasure: UnitOfMeasure = new UnitOfMeasure();
  updateForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted = false;

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private unitOfMeasureService: UnitOfMeasureService,
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
      name: ['',[Validators.required,Validators.maxLength(40)]],
      shortName: ['',[Validators.required,Validators.maxLength(4)]],
    });
  }

  load() {
    this.unitOfMeasureService
      .getById(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.updateForm.patchValue(response.data),
        (error) => console.error(error),
        () => console.log('Islem Tamam')
      );
  }

  get getControl(){
    return this.updateForm.controls
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
    if (this.updateForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.unitOfMeasure = Object.assign({}, this.updateForm.value);
    this.unitOfMeasure.id = this.id;
    this.unitOfMeasureService
      .update(this.unitOfMeasure)
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

  // tslint:disable-next-line:typedef
  dismissModal() {
    this.alertifyService.warning('Islem Iptal Edildi...');
    this.activeModal.dismiss();
  }
}
