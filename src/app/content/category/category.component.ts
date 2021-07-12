import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { CreateComponent } from './components/create/create.component';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { UpdateComponent } from './components/update/update.component';
import { CategoryService } from 'src/app/core/services/api-services/category/category.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private seewtalertService: SweetalertService,
    private categoryService: CategoryService,
    private alertifyService: AlertifyService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.categoryService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.categories = response.data),
        (err) => this.alertifyService.error('Veriler Gelmedi'),
        () => console.log('Islem Tamam')
      );
  }

  trackByFn(index: number, category: Category): number {
    return category.id;
  }

  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.categoryService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => this.alertifyService.success(response.message),
          (err) => console.error(`${err}`),
          () => this.loadAll()
        )
    );
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (item) => item,
      (err) => console.log(err),
      () => this.loadAll()
    );
  }

  openUpdateModal(id: number) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.id = id;
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (item) => item,
      (err) => console.log(err),
      () => this.loadAll()
    );
  }
}
