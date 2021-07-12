import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { CategoryService } from 'src/app/core/services/api-services/category/category.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  category: Category = new Category();
  addForm: FormGroup = new FormGroup({});
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
    this.createFormGroup();
  }

  createFormGroup() {
    this.addForm = this.fromBuilder.group({
      id: [0],
      name: [''],
      description: [''],
      //[Validators.required,Validators.maxLength(100)]
    });
  }
  get getControl(){
    return this.addForm.controls;
  }

  onAdd() {
    this.isValidFormSubmitted = false;
		if (this.addForm.invalid) {
			return;
		}
    this.isValidFormSubmitted = true;
    this.category = Object.assign({}, this.addForm.value);
    this.categoryService
      .add(this.category)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => this.alertifyService.success(response.message),
        (err) => console.error(`${err}`),
        () => console.log('Tamamlandi.')
      );
    this.activeModal.close(this.category);
  }

  closeModal() {
    this.activeModal.close(true);
  }

  dismissModal() {
    this.alertifyService.warning('Islem Iptal Edildi...');
    this.activeModal.dismiss();
  }
}
