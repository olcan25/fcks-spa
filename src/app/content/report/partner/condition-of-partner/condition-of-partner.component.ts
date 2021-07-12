import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DtoConditionOfPartner } from 'src/app/core/models/partner/condition-of-parner.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { ReportService } from 'src/app/core/services/api-services/report/report.service';

@Component({
  selector: 'app-condition-of-partner',
  templateUrl: './condition-of-partner.component.html',
  styleUrls: ['./condition-of-partner.component.css'],
})
export class ConditionOfPartnerComponent implements OnInit, OnDestroy {
  condtionOfPartners: DtoConditionOfPartner[] = [];
  cols: any[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private reportService: ReportService,
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
    this.reportService
      .getAllConditionOfPartners()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.condtionOfPartners = response.data), console.log(response);
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
    this.cols = [
      { field: 'partnerId' },
      { field: 'partnerName' },
      { field: 'uniqueIdentificationNumber' },
      { field: 'vatNumber' },
      { field: 'debt' },
      { field: 'credit' },
      { field: 'balance' },
    ];
  }

  loadAllBetweenDate(starDate: any, endDate: any) {
    this.reportService
      .getAllConditionOfPartnersBetweenDate(starDate, endDate)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => (this.condtionOfPartners = response.data),
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  trackByFn = (
    index: number,
    conditionOfPartner: DtoConditionOfPartner
  ): number => conditionOfPartner.partnerId;

  clear(table: Table) {
    table.clear();
  }
}
