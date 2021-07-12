import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Company } from 'src/app/core/models/company.model';
import { GetDtoCompany } from 'src/app/core/models/company/get-dto-company.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { SweetalertService } from 'src/app/core/services/alert-service/sweetalert.service';
import { CompanyService } from 'src/app/core/services/api-services/company/company.service';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private seewtalertService: SweetalertService,
    private companyService: CompanyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.companyService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.companies = response.data),
        (err) => this.alertifyService.error('Veri Gelmedi'),
        () => console.log('Veriler Geldi')
      );
  }

  trackByFn(index: number, company: Company): number {
    return company.id;
  }

  delete(id: number) {
    this.seewtalertService.confrim(() =>
      this.companyService
        .delete(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => this.alertifyService.success(response.message),
          (err) => this.alertifyService.error(`${err}`),
          () => this.loadAll()
        )
    );
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => console.log('Islem Gerceklesti'),
      (err) => console.log(err),
      () => this.loadAll()
    );
  }

  openUpdateModal(id: number) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.id = id;
    modalRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => console.log('Islem Gerceklesti'),
      (err) => console.log(err),
      () => this.loadAll()
    );
  }
}
