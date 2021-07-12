import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnitOfMeasure } from 'src/app/core/models/unit-of-measure.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { UnitOfMeasureService } from 'src/app/core/services/api-services/unit-of-measure/unit-of-measure.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  unitOfMeasure: UnitOfMeasure = new UnitOfMeasure();
  addForm: FormGroup = new FormGroup({});
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
    this.createFormGroup();
  }

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
      id: [0],
      name: ['',[Validators.required,Validators.maxLength(40)]],
      shortName: ['',[Validators.required,Validators.maxLength(4)]],
    });
  }

  get getControl(){
    return this.addForm.controls
  }

  onAdd() {
    this.isValidFormSubmitted = false;
    if (this.addForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.unitOfMeasure = Object.assign({}, this.addForm.value);
    this.unitOfMeasureService
      .add(this.unitOfMeasure)
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
