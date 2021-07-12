import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Partner } from 'src/app/core/models/partner.model';
import { DtoCardOfPartner } from 'src/app/core/models/partner/card-of-partner.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { PartnerService } from 'src/app/core/services/api-services/partner/partner.service';
import { ReportService } from 'src/app/core/services/api-services/report/report.service';

@Component({
  selector: 'app-card-of-partner',
  templateUrl: './card-of-partner.component.html',
  styleUrls: ['./card-of-partner.component.css'],
})
export class CardOfPartnerComponent implements OnInit, OnDestroy {
  cardOfPartners: DtoCardOfPartner[] = [];
  partner: Partner = new Partner();
  cols: any[] = [];
  balance: number[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService,
    private alertifyService: AlertifyService,
    private partnerService: PartnerService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (params) => (
        this.loadAll(params['id']), this.loadGetByPartnerId(params['id'])
      ),
      (err) => this.alertifyService.error(err),
      () => console.log('Islem Tamam')
    );
    this.cols = [
      { field: 'ledgerId' },
      { field: 'registerDate' },
      { field: 'invoiceNumber' },
      { field: 'debt' },
      { field: 'credit' },
      { field: 'balance' },
    ];
  }

  loadGetByPartnerId(id: number) {
    this.partnerService
      .getById(id)
      .subscribe((response) => (this.partner = response.data));
  }

  loadAll(id: number) {
    this.reportService
      .getByPartnerIdCardOfPartners(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.cardOfPartners = response.data),
            (this.balance = response.data.map((x) => x.balance));
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  loadAllBetweenDate(starDate: any, endDate: any) {
    let partnerId: number = 0;
    this.activatedRoute.params.subscribe((params) => {
      partnerId = params['id'];
    });
    this.reportService
      .getByPartnerIdCardOfPartnersPost(partnerId, starDate, endDate)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          (this.cardOfPartners = response.data),
            (this.balance = response.data.map((x) => x.balance));
        },
        (err) => this.alertifyService.error(err),
        () => console.log('Islem Tamam')
      );
  }

  totalBalance(index: number): number {
    let value = 0;
    index = index + 1;

    for (let i = 0; i < index; i++) {
      value += this.balance[i];
    }
    return value;
  }

  trackByFn = (index: number, cardOfPartner: DtoCardOfPartner): number =>
    cardOfPartner.ledgerId;

  clear(table: Table) {
    table.clear();
  }
}
