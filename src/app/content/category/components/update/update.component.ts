import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { CategoryService } from 'src/app/core/services/api-services/category/category.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() public id: any;
  category: Category = new Category();
  updateForm: FormGroup = new FormGroup({});
  private ngUnsubscribe = new Subject<void>();
  isValidFormSubmitted:boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private fromBuilder: FormBuilder,
    private categoryService: CategoryService,
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
      name: ['',[Validators.required,Validators.maxLength(100)]],
      description: [''],
    });
  }

  load() {
    this.categoryService
      .getById(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.updateForm.patchValue(response.data),
        (error) => this.alertifyService.error(error),
        () => console.log('Islem Tamam')
      );
  }

  get getControl(){
    return this.updateForm.controls;
  }

  onUpdate() {
    this.isValidFormSubmitted = false;
		if (this.updateForm.invalid) {
			return;
		}
    this.isValidFormSubmitted = true;
    this.category = Object.assign({}, this.updateForm.value);
    this.category.id = this.id;
    this.categoryService
      .update(this.category)
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
